import { GoogleGenAI } from '@google/genai';

/**
 * Dedicated Backend Gemini Service for REEVANA
 * 
 * SECURITY RULES:
 * 1. Never hardcode API key.
 * 2. Never expose key to client.
 * 3. Access key strictly via process.env.GEMINI_API_KEY.
 * 4. Never log or print the API key in console/error logs.
 */

let aiClientInstance = null;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  
  if (!aiClientInstance) {
    aiClientInstance = new GoogleGenAI({ apiKey });
  }
  return aiClientInstance;
}

/**
 * Validates and normalizes the JSON returned from Gemini or Fallback
 */
function validateAndNormalizeItinerary(rawJson, formData) {
  const userBudget = Number(formData.budget) || 10000;
  const numDays = Number(formData.days) || 3;
  const startDateStr = formData.startDate || new Date().toISOString().split('T')[0];

  const destination = rawJson.destination || formData.destination || 'Mussoorie';
  const summary = rawJson.summary || `A personalized ${numDays}-day ${formData.travelType || 'Friends'} trip to ${destination}.`;

  // Normalize Cost Breakdown (in INR ₹)
  const rawBreakdown = rawJson.costBreakdown || {};
  const accommodation = Number(rawBreakdown.accommodation) || Math.round(userBudget * 0.35);
  const food = Number(rawBreakdown.food) || Math.round(userBudget * 0.25);
  const transportation = Number(rawBreakdown.transportation) || Math.round(userBudget * 0.15);
  const activitiesCost = Number(rawBreakdown.activities) || Math.round(userBudget * 0.15);
  const miscellaneous = Number(rawBreakdown.miscellaneous) || Math.round(userBudget * 0.10);

  const costBreakdown = {
    accommodation,
    food,
    transportation,
    activities: activitiesCost,
    miscellaneous
  };

  // Compute calculated total from breakdown or raw
  const breakdownSum = accommodation + food + transportation + activitiesCost + miscellaneous;
  const rawTotal = Number(rawJson.estimatedTotalCost);
  const estimatedTotalCost = (!isNaN(rawTotal) && rawTotal > 0) ? rawTotal : breakdownSum;

  const budgetStatus = estimatedTotalCost > userBudget ? 'Exceeds Budget' : 'Within Budget';

  // Normalize Days
  const rawDays = Array.isArray(rawJson.days) ? rawJson.days : [];
  const days = [];

  for (let d = 1; d <= numDays; d++) {
    const dayItem = rawDays.find(item => Number(item.day) === d) || rawDays[d - 1] || {};
    
    // Calculate Date
    let dateStr = dayItem.date || '';
    if (!dateStr && startDateStr) {
      const dObj = new Date(startDateStr);
      if (!isNaN(dObj.getTime())) {
        dObj.setDate(dObj.getDate() + (d - 1));
        dateStr = dObj.toISOString().split('T')[0];
      }
    }

    const rawActivities = Array.isArray(dayItem.activities) ? dayItem.activities : [];
    const activities = rawActivities.map((act, actIdx) => {
      const durationMinutes = Number(act.durationMinutes) || 90;
      const estimatedCost = Number(act.estimatedCost) || 0;

      return {
        time: act.time || (actIdx === 0 ? '09:00 AM' : actIdx === 1 ? '11:30 AM' : actIdx === 2 ? '02:30 PM' : '06:30 PM'),
        place: act.place || `${destination} Attraction #${actIdx + 1}`,
        activity: act.activity || act.place || 'Sightseeing & Exploration',
        description: act.description || 'Enjoy key highlights and local culture at this destination.',
        durationMinutes,
        estimatedCost,
        transportation: act.transportation || 'Local taxi / walking'
      };
    });

    // Compute daily estimated cost
    const dailyEstimatedCost = Number(dayItem.dailyEstimatedCost) || 
      activities.reduce((acc, a) => acc + (Number(a.estimatedCost) || 0), 0);

    days.push({
      day: d,
      date: dateStr,
      theme: dayItem.theme || (d === 1 ? 'Arrival & Sightseeing' : d === numDays ? 'Departure & Shopping' : 'Culture & Hidden Gems'),
      activities,
      dailyEstimatedCost
    });
  }

  // Normalize Tips & Packing Suggestions
  const tips = Array.isArray(rawJson.tips) && rawJson.tips.length > 0 
    ? rawJson.tips 
    : [
        'Book local transit passes early to reduce transportation costs.',
        'Enjoy street food at registered markets for authentic taste and lower dining bills.',
        'Travel during morning hours to avoid peak tourist crowds.'
      ];

  const packingSuggestions = Array.isArray(rawJson.packingSuggestions) && rawJson.packingSuggestions.length > 0
    ? rawJson.packingSuggestions
    : [
        'Comfortable walking shoes',
        'Weather-appropriate layered clothing',
        'Reusable water bottle & power bank',
        'Basic first aid & essential medications'
      ];

  // Determine weather notice status
  const weatherData = formData.weatherData || rawJson.weatherData || null;
  const isRainy = weatherData && (parseInt(weatherData.rainChance) >= 40 || String(weatherData.condition).toLowerCase().includes('rain'));
  const weatherNotice = rawJson.weatherNotice || (isRainy ? "Your itinerary has been adjusted based on the expected weather." : "Great weather for outdoor activities.");
  const weatherAdjusted = rawJson.weatherAdjusted ?? Boolean(isRainy);

  // Construct complete normalized object strictly matching required schema + helper aliases for legacy UI compatibility
  return {
    destination,
    summary,
    estimatedTotalCost,
    budgetStatus,
    days,
    costBreakdown,
    tips,
    packingSuggestions,
    weatherNotice,
    weatherAdjusted,
    weatherData,
    // Helper fields for UI components
    tripTitle: `${numDays}-Day ${formData.travelType || 'Trip'} to ${destination}`,
    userBudget: userBudget,
    travelers: Number(formData.travelers) || 2,
    travelType: formData.travelType || 'Friends',
    pace: formData.pace || 'Balanced',
    startDate: startDateStr,
    // Legacy support arrays/objects
    itineraryDays: days.map(d => ({
      dayNumber: d.day,
      dateTitle: `Day ${d.day}${d.date ? ` (${d.date})` : ''}`,
      theme: d.theme,
      activities: d.activities.map((a, idx) => ({
        id: `act-${d.day}-${idx}`,
        time: a.time,
        place: a.place,
        activity: a.activity,
        description: a.description,
        estimatedCost: `₹${a.estimatedCost.toLocaleString()}`,
        costNumber: a.estimatedCost,
        durationMinutes: a.durationMinutes,
        duration: `${Math.floor(a.durationMinutes / 60) > 0 ? `${Math.floor(a.durationMinutes / 60)}h ` : ''}${a.durationMinutes % 60 > 0 ? `${a.durationMinutes % 60}m` : ''}`.trim() || `${a.durationMinutes} mins`,
        category: formData.interests && formData.interests[idx % formData.interests.length] ? formData.interests[idx % formData.interests.length] : 'Exploration',
        transportationSuggestion: a.transportation
      }))
    })),
    budgetSummary: {
      totalEstimatedCost: estimatedTotalCost,
      userBudget: userBudget,
      remainingAmount: userBudget - estimatedTotalCost,
      stayCost: accommodation,
      foodCost: food,
      transportCost: transportation,
      activityCost: activitiesCost,
      miscCost: miscellaneous,
      perPersonDaily: Math.round(estimatedTotalCost / (numDays * (Number(formData.travelers) || 2))),
      currency: 'INR'
    }
  };
}

/**
 * Contextual AI Travel Assistant Chat Service (Part 1 Spec)
 */
export async function chatWithAssistant({ message = '', history = [], tripContext = {} }) {
  const ai = getGeminiClient();

  const contextStr = `
USER'S CURRENT TRIP CONTEXT:
- Destination: ${tripContext.destination || 'Mussoorie'}
- Travel Start Date: ${tripContext.startDate || 'Upcoming'}
- Duration: ${tripContext.days || 3} Days
- Travelers: ${tripContext.travelers || 2} (${tripContext.travelType || 'Friends'})
- Total User Budget: ₹${tripContext.userBudget || tripContext.budget || 10000} INR
- Preferred Pace: ${tripContext.pace || 'Balanced'}
- Interests: ${Array.isArray(tripContext.interests) ? tripContext.interests.join(', ') : (tripContext.interests || 'Nature, Food')}
- Current Location / Focus: ${tripContext.selectedLocation || tripContext.destination || 'Mussoorie'}
- Weather Forecast: ${tripContext.weather || '🌤️ 22°C - Pleasant & Mild'}
- Current Itinerary Overview: ${tripContext.summary || 'Personalized multi-day travel schedule'}
`.trim();

  const systemPrompt = `
You are REEVANA's senior AI Travel Assistant Concierge.
You are helping a traveler plan and navigate their trip.
Always answer using Indian Rupees (INR - ₹) for any price, budget, or fare references.

${contextStr}

INSTRUCTIONS:
1. Provide friendly, helpful, concise travel advice based on the user's current trip context.
2. If the user asks a question about transportation (e.g. "How can I reach George Everest from Mall Road?"), give estimated fares in ₹ (e.g., Taxi ₹400–₹700, Bus ₹50–₹80) and travel time.
3. If the user asks for rain/weather alternatives, less crowded spots, or food recommendations, tailor your answer to their destination (${tripContext.destination || 'Mussoorie'}).
4. If the user explicitly asks to modify or optimize their itinerary (e.g., "Change Day 2", "Optimize for ₹5,000", "Less travel on Day 1"), provide a clear explanation AND include a valid JSON block enclosed in \`\`\`json ... \`\`\` with updated itinerary schema so the frontend can update their trip schedule.

User Question: "${message}"
`.trim();

  if (ai) {
    try {
      const candidateModels = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: systemPrompt
          });

          if (response && response.text) {
            let answerText = response.text.trim();
            
            // Check if AI included updated itinerary JSON
            let updatedItinerary = null;
            if (answerText.includes('```json')) {
              try {
                const match = answerText.match(/```json\s*([\s\S]*?)\s*```/);
                if (match && match[1]) {
                  updatedItinerary = JSON.parse(match[1]);
                  answerText = answerText.replace(/```json\s*[\s\S]*?\s*```/, '').trim();
                }
              } catch (e) {
                console.warn('[AI Chat Assistant]: Failed to parse embedded JSON update');
              }
            }

            return {
              reply: answerText,
              updatedItinerary,
              provider: `Google ${modelName}`,
              isAiGenerated: true
            };
          }
        } catch (mErr) {
          console.warn(`[AI Chat Assistant]: Candidate model ${modelName} error:`, mErr.message ? mErr.message.replace(/key=[^&]+/gi, 'key=HIDDEN') : String(mErr));
        }
      }
    } catch (err) {
      console.error('[AI Chat Assistant Error]:', err.message ? err.message.replace(/key=[^&]+/gi, 'key=HIDDEN') : err);
    }
  }

  // Local Fallback Assistant if API is unreachable
  return generateFallbackChatReply(message, tripContext);
}

/**
 * Local Fallback AI Assistant Reply Generator
 */
function generateFallbackChatReply(message = '', tripContext = {}) {
  const msgLower = message.toLowerCase();
  const dest = tripContext.destination || 'Mussoorie';

  let reply = '';
  if (msgLower.includes('george everest') || msgLower.includes('reach') || msgLower.includes('transportation')) {
    reply = `To reach George Everest Peak from ${dest} Mall Road:\n\n• 🚕 **Private Taxi:** ~₹400–₹700 (25-30 mins direct, Estimated fare)\n• 🚌 **Shared Bus/Auto:** ~₹50–₹80 (to Hathipaon junction, followed by 1.5 km walk)\n• 🚗 **Rental Scooter:** ~₹800–₹1,200/day\n\n💡 *Recommended:* Private taxi offers the best balance of convenience and mountain road speed.`;
  } else if (msgLower.includes('cheap') && (msgLower.includes('hotel') || msgLower.includes('stay') || msgLower.includes('expensive'))) {
    reply = `Here are lower-cost accommodation options near your ${dest} itinerary:\n\n1. **Fortune Resort Grace** (~₹5,500/night, Library Chowk) — Centrally located, saves ~₹600 in local taxi fares.\n2. **Zostel Mussoorie Eco Hostel** (~₹950/night, Koti Village) — Great budget option with mountain views.\n3. **Seagram's Hilltop Heritage Homestay** (~₹2,400/night, Hathipaon) — Located near George Everest Peak activities.\n\n💡 *Tip:* Choosing a central stay near Library Chowk reduces daily transit expenses significantly.`;
  } else if (msgLower.includes('mall road') || msgLower.includes('eat near') || (msgLower.includes('food') && msgLower.includes('local'))) {
    reply = `Top dining spots near Mall Road, ${dest}:\n\n1. **Lovely Omelette Centre** (Mall Road) — Famous cheese butter omelettes & tea (~₹150/person, Verified Google Place).\n2. **Kalsang Friends Corner** (Survey Colony) — Authentic Tibetan momos & thukpa (~₹450/person).\n3. **Café By The Way** (Mall Road) — Artisan coffee & wood-fired snacks (~₹400/person).\n4. **Char Dukan** (Landour, 2 km away) — Cinnamon apple waffles & kulhad chai (~₹350/person).`;
  } else if (msgLower.includes('veg') || msgLower.includes('vegetarian')) {
    reply = `Top Vegetarian dining options in ${dest}:\n\n• 🥦 **Char Dukan Heritage Café** (Landour) — 100% Veg waffles, bun omelettes & tea (~₹350/person).\n• 🥦 **Café By The Way** (Mall Road) — Specialty coffee, veg arrabbiata pasta (~₹400/person).\n• 🥦 **Urban Turban Punjabi Bistro** (Library Chowk) — Rich paneer tikka & butter naan (~₹550/person).`;
  } else if (msgLower.includes('day 2') || msgLower.includes('activities')) {
    reply = `Recommended restaurants near your Day 2 activities in ${dest}:\n\n• **Emily's at Rokeby Manor** (Landour) — Heritage dining near Landour & Lal Tibba.\n• **Char Dukan Heritage Café** — Great spot for afternoon snacks & herbal teas.\n• **Lovely Omelette Centre** — Quick bite before evening Mall Road stroll.`;
  } else if (msgLower.includes('rain') || msgLower.includes('weather')) {
    reply = `Since it's raining in ${dest}, here are top covered/indoor spots:\n\n1. **Char Dukan & Landour Bakery** — Enjoy hot ginger tea & fresh pancakes under colonial awnings.\n2. **Mussoorie Heritage Centre** — Explore historic archives, maps, and art.\n3. **Local Mall Road Cafes** — Cozy up at local cafes overlooking mist-covered valleys.`;
  } else if (msgLower.includes('optimize')) {
    reply = `Gemini Trip Optimization Analysis for ${dest}:\n\n• 🏨 **Stay Location:** Staying near Library Chowk (e.g. Fortune Resort Grace) reduces total taxi distance by ~4 km and saves ~₹600 in fares.\n• 🍛 **Food Budget:** Including local spots like Lovely Omelette Centre & Char Dukan reduces daily dining cost by ~₹450.\n• 🌤️ **Weather Adjustment:** Schedule indoor cafes and heritage walk during rain window.`;
  } else {
    reply = `Here are great recommendations for your ${dest} trip (${tripContext.travelers || 2} travelers, budget ₹${(tripContext.userBudget || tripContext.budget || 10000).toLocaleString('en-IN')}):\n\n• Visit **Kempty Falls** early morning (around 8:00 AM) to avoid peak tourist rush.\n• Enjoy dinner at **Kalsang Friends Corner** on Mall Road (~₹450/person).\n• Take a cable car to **Gun Hill** at golden hour for panoramic Himalayan views (~₹200 return).\n\nHow else can I assist with your food, stays, or itinerary?`;
  }

  return {
    reply,
    updatedItinerary: null,
    provider: 'REEVANA Smart Chat Engine',
    isFallback: true
  };
}

/**
 * Generates a structured trip itinerary using Google Gemini API with backend validation
 */
export async function generateTripItinerary(formData) {
  const {
    destination = 'Mussoorie',
    days = 3,
    startDate = '',
    endDate = '',
    travelers = 2,
    travelType = 'Friends',
    budget = 10000,
    interests = ['Nature', 'Adventure', 'Food'],
    pace = 'Balanced',
    weatherData = null
  } = formData;

  const ai = getGeminiClient();

  const weatherContextStr = weatherData ? `
WEATHER DATA PROVIDED BY APP:
- Condition: ${weatherData.condition || 'Partly Cloudy'}
- Temperature: ${weatherData.tempC || 24}°C (Feels like ${weatherData.feelsLikeC || 23}°C)
- Rain Chance: ${weatherData.rainChance || '20%'}
- Humidity: ${weatherData.humidity || '65%'}

WEATHER RULES:
1. Do NOT invent fake weather. Use ONLY the weather data supplied above.
2. If rain chance is >= 40% or condition is rainy/showers/storm: Replace outdoor treks, mountain peaks, and open waterfalls with comfortable indoor alternatives (museums, cafes, covered markets, indoor cultural workshops). Include "weatherNotice": "Your itinerary has been adjusted based on the expected weather." and "weatherAdjusted": true in JSON.
3. If weather is good (sunny/clear/partly cloudy): Include "weatherNotice": "Great weather for outdoor activities." and "weatherAdjusted": false in JSON.
` : `
WEATHER RULES:
Include "weatherNotice": "Great weather for outdoor activities." and "weatherAdjusted": false in JSON.
`;

  if (ai) {
    try {
      const prompt = `
You are REEVANA's expert AI Travel Planner.
Generate a realistic, logical, weather-aware, and pace-matched travel itinerary for:
- Destination: ${destination}
- Duration: ${days} days ${startDate ? `(From ${startDate} to ${endDate})` : ''}
- Travelers: ${travelers} (${travelType})
- Total User Budget: ₹${budget} INR
- Travel Pace: ${pace}
- Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}
${weatherContextStr}

IMPORTANT INSTRUCTIONS:
1. All costs (activity costs, daily costs, cost breakdown, estimated total cost) MUST be estimated in Indian Rupees (INR - ₹) based on local prices in ${destination}.
2. Ensure realistic transportation costs, food costs, accommodation costs, and activity entrance fees.
3. Ensure logical travel sequence and reasonable activity durations.

RETURN STRICT VALID JSON ONLY (NO MARKDOWN WRAPPERS, NO EXTRA PROSE) MATCHING EXACTLY THIS SCHEMA:
{
  "destination": "${destination}",
  "summary": "Detailed overall summary of the trip itinerary and highlights.",
  "estimatedTotalCost": ${budget},
  "budgetStatus": "Within Budget",
  "days": [
    {
      "day": 1,
      "date": "${startDate || ''}",
      "theme": "Theme of Day 1",
      "activities": [
        {
          "time": "09:00 AM",
          "place": "Exact Name of Place/Attraction",
          "activity": "Activity Name",
          "description": "Engaging 2-sentence description of what to do here.",
          "durationMinutes": 90,
          "estimatedCost": 250,
          "transportation": "Taxi / Walking / Auto-rickshaw tip"
        }
      ],
      "dailyEstimatedCost": 1200
    }
  ],
  "costBreakdown": {
    "accommodation": ${Math.round(budget * 0.35)},
    "food": ${Math.round(budget * 0.25)},
    "transportation": ${Math.round(budget * 0.15)},
    "activities": ${Math.round(budget * 0.15)},
    "miscellaneous": ${Math.round(budget * 0.10)}
  },
  "tips": [
    "Practical money saving tip 1",
    "Local transportation advice 2",
    "Best time or dining suggestion 3"
  ],
  "packingSuggestions": [
    "Suggested item 1",
    "Suggested item 2",
    "Suggested item 3"
  ]
}

Ensure all ${days} days are present in the "days" array, with 4 to 5 structured activities per day (e.g. 09:00 AM Breakfast/Sightseeing, 11:30 AM Landmark, 01:30 PM Lunch, 04:00 PM Afternoon Activity, 07:30 PM Evening Dinner/Nightlife).
`.trim();

      const candidateModels = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      let responseText = null;
      let usedModel = candidateModels[0];

      for (const modelName of candidateModels) {
        let attempts = 0;
        const maxAttempts = modelName === 'gemini-3.6-flash' ? 3 : 1;

        while (attempts < maxAttempts && !responseText) {
          attempts++;
          try {
            const timeoutMs = 45000;
            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Gemini API request timed out after 45s')), timeoutMs)
            );

            const apiPromise = ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config: {
                responseMimeType: 'application/json'
              }
            });

            const response = await Promise.race([apiPromise, timeoutPromise]);
            if (response && response.text) {
              responseText = response.text;
              usedModel = modelName;
              break;
            }
          } catch (modelErr) {
            const errStr = modelErr.message ? modelErr.message : String(modelErr);
            console.warn(`[Gemini Service]: Candidate model ${modelName} (attempt ${attempts}/${maxAttempts}) error:`, errStr.replace(/key=[^&]+/gi, 'key=HIDDEN'));
            
            if (errStr.includes('503') && attempts < maxAttempts) {
              await new Promise((r) => setTimeout(r, 1500));
            } else {
              break;
            }
          }
        }

        if (responseText) break;
      }

      if (!responseText) {
        throw new Error('Empty response received from Gemini API');
      }

      // Clean markdown codeblocks if model wrapped output in ```json ... ```
      let cleanJson = responseText.trim();
      if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '').trim();
      }

      const parsedData = JSON.parse(cleanJson);

      // Validate & Normalize on Backend
      const validatedResult = validateAndNormalizeItinerary(parsedData, formData);

      return {
        ...validatedResult,
        isAiGenerated: true,
        provider: `Google ${usedModel}`
      };
    } catch (error) {
      const sanitizedError = error.message ? error.message.replace(/key=[^&]+/gi, 'key=HIDDEN') : 'Unknown Gemini Error';
      console.error('[Gemini Service Warning]: API call failed or timed out. Engaging fallback generator. Error:', sanitizedError);
    }
  } else {
    console.log('[Gemini Service Info]: GEMINI_API_KEY environment variable is not configured. Engaging fallback generator.');
  }

  return generateFallbackItinerary(formData);
}

/**
 * Structured Fallback Generator if Gemini API is unavailable or times out
 */
function generateFallbackItinerary(formData) {
  const {
    destination = 'Mussoorie',
    days = 3,
    travelers = 2,
    travelType = 'Friends',
    budget = 10000,
    interests = ['Nature', 'Adventure', 'Food'],
    pace = 'Balanced'
  } = formData;

  const activitiesPerDay = pace === 'Relaxed' ? 3 : pace === 'Fast-paced' ? 5 : 4;
  const timeSlots = ['09:00 AM', '11:30 AM', '02:00 PM', '05:00 PM', '07:30 PM'];

  const sampleActivities = [
    { name: 'Kempty Falls & Scenic Nature Walk', duration: 120, cost: 200, desc: 'Scenic mountain waterfall and surrounding pine forest trail stroll.', transport: 'Local Shared Auto / Taxi (20 mins)' },
    { name: 'Gun Hill Cable Car & Sunset Point', duration: 90, cost: 350, desc: 'Panoramic ropeway ride offering 360-degree views of Himalayan ranges.', transport: 'Ropeway Cable Car' },
    { name: 'Mall Road Culinary & Heritage Walk', duration: 120, cost: 500, desc: 'Explore historic colonial architecture and sample iconic local snacks and bakery treats.', transport: 'Walking along pedestrian promenade' },
    { name: 'Company Garden & Picnic Spot', duration: 90, cost: 150, desc: 'Beautifully landscaped flower gardens, boating pond, and outdoor photography spots.', transport: 'Walk or Rickshaw (10 mins)' },
    { name: 'Camel\'s Back Road Nature & Adventure Trek', duration: 150, cost: 0, desc: 'Peaceful 3 km nature trail with rocky rock formations and mountain fresh air.', transport: 'On Foot Trek' }
  ];

  const daysList = [];
  for (let d = 1; d <= days; d++) {
    const dayActivities = [];
    let dayTotalCost = 0;

    for (let a = 0; a < Math.min(activitiesPerDay, timeSlots.length); a++) {
      const template = sampleActivities[(d + a) % sampleActivities.length];
      const actCost = template.cost * travelers;
      dayTotalCost += actCost;

      dayActivities.push({
        time: timeSlots[a],
        place: `${template.name} - ${destination}`,
        activity: template.name,
        description: template.desc,
        durationMinutes: template.duration,
        estimatedCost: actCost,
        transportation: template.transport
      });
    }

    daysList.push({
      day: d,
      date: formData.startDate ? new Date(new Date(formData.startDate).getTime() + (d - 1) * 86400000).toISOString().split('T')[0] : '',
      theme: d === 1 ? 'Arrival & Mall Road Discovery' : d === days ? 'Scenic Overlook & Departure' : 'Waterfalls & Nature Trails',
      activities: dayActivities,
      dailyEstimatedCost: dayTotalCost
    });
  }

  const userBudgetNum = Number(budget) || 10000;
  const stayCost = Math.round(userBudgetNum * 0.35);
  const foodCost = Math.round(userBudgetNum * 0.25);
  const activityCost = Math.round(userBudgetNum * 0.20);
  const transportCost = Math.round(userBudgetNum * 0.12);
  const miscCost = Math.round(userBudgetNum * 0.08);
  const estimatedTotalCost = stayCost + foodCost + activityCost + transportCost + miscCost;

  const fallbackData = {
    destination,
    summary: `A high-energy ${days}-day ${travelType} itinerary to ${destination} designed for ${travelers} travelers focusing on ${interests.join(', ')}.`,
    estimatedTotalCost,
    budgetStatus: estimatedTotalCost > userBudgetNum ? 'Exceeds Budget' : 'Within Budget',
    days: daysList,
    costBreakdown: {
      accommodation: stayCost,
      food: foodCost,
      transportation: transportCost,
      activities: activityCost,
      miscellaneous: miscCost
    },
    tips: [
      'Use shared taxis along Mall Road and Library Chowk to save on local transport.',
      'Visit Gun Hill during early morning or golden hour for clearer mountain views with fewer crowds.',
      'Carry cash for small entry tickets and street food stalls.'
    ],
    packingSuggestions: [
      'Comfortable hiking/walking shoes',
      'Light jacket or sweater for cool mountain breezes',
      'Sunscreen, sunglasses, and camera'
    ]
  };

  return {
    ...validateAndNormalizeItinerary(fallbackData, formData),
    isFallback: true,
    provider: 'REEVANA Smart Fallback Engine'
  };
}

