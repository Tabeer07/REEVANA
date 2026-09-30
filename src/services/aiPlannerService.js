/**
 * REEVANA AI Planner Service
 * 
 * Connects frontend to backend API endpoint POST /api/ai/plan-trip
 * powered by Google Gemini API.
 */

export const generateSmartItinerary = async (formData, onProgressUpdate) => {
  const steps = [
    'Planning your perfect trip...',
    'Finding the best experiences...',
    'Optimizing your itinerary...',
    'Calculating your estimated budget...'
  ];

  // Progress simulation helper
  let progressStep = 0;
  const progressInterval = setInterval(() => {
    if (progressStep < steps.length - 1) {
      progressStep++;
      if (onProgressUpdate) {
        onProgressUpdate(steps[progressStep], Math.round(((progressStep + 1) / steps.length) * 90));
      }
    }
  }, 900);

  if (onProgressUpdate) {
    onProgressUpdate(steps[0], 20);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 40000);

    const response = await fetch('/api/ai/plan-trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Failed to generate itinerary (Status ${response.status}).`);
    }

    const data = await response.json();

    clearInterval(progressInterval);
    if (onProgressUpdate) {
      onProgressUpdate('Itinerary successfully generated!', 100);
    }

    return data;
  } catch (error) {
    clearInterval(progressInterval);
    console.warn('[AI Planner Frontend Service]: Backend API call failed or timed out. Falling back to local engine.', error);
    
    if (onProgressUpdate) {
      onProgressUpdate('Generating itinerary via REEVANA Engine...', 100);
    }

    return generateLocalFallbackItinerary(formData);
  }
};

/**
 * Local fallback generator matching the defined JSON schema in INR
 */
function generateLocalFallbackItinerary(formData) {
  const {
    destination = 'Mussoorie',
    days = 3,
    travelers = 2,
    travelType = 'Friends',
    budget = 10000,
    interests = ['Nature', 'Adventure', 'Food'],
    pace = 'Balanced',
    startDate = new Date().toISOString().split('T')[0]
  } = formData;

  const userBudgetNum = Number(budget) || 10000;
  const numDays = Number(days) || 3;

  const activitiesPerDay = pace === 'Relaxed' ? 3 : pace === 'Fast-paced' ? 5 : 4;
  const timeSlots = ['09:00 AM', '11:30 AM', '02:00 PM', '05:00 PM', '07:30 PM'];

  const sampleActivities = [
    { name: 'Kempty Falls & Nature Trail Walk', duration: 120, cost: 200, desc: 'Cascading hill waterfall surrounded by lush pine flora.', transport: 'Local shared taxi' },
    { name: 'Gun Hill Cable Car & Mountain Sunset', duration: 90, cost: 350, desc: 'Spectacular aerial views of the Doon Valley and snow peaks.', transport: 'Ropeway Cable Car' },
    { name: 'Mall Road Culinary & Heritage Walk', duration: 120, cost: 500, desc: 'Sample famous hill station bakeries and local street snacks.', transport: 'Pedestrian walk' },
    { name: 'Company Garden & Botanical Pavilion', duration: 90, cost: 150, desc: 'Vibrant flowers, boating lake, and photography spots.', transport: 'Cycle Rickshaw / Walk' }
  ];

  const daysList = [];
  for (let d = 1; d <= numDays; d++) {
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

    const dayDate = startDate ? new Date(new Date(startDate).getTime() + (d - 1) * 86400000).toISOString().split('T')[0] : '';

    daysList.push({
      day: d,
      date: dayDate,
      theme: d === 1 ? 'Arrival & Neighborhood Discovery' : d === numDays ? 'Scenic Overlook & Departure' : 'Waterfalls & Nature Trails',
      activities: dayActivities,
      dailyEstimatedCost: dayTotalCost
    });
  }

  const stayCost = Math.round(userBudgetNum * 0.35);
  const foodCost = Math.round(userBudgetNum * 0.25);
  const activityCost = Math.round(userBudgetNum * 0.20);
  const transportCost = Math.round(userBudgetNum * 0.12);
  const miscCost = Math.round(userBudgetNum * 0.08);
  const estimatedTotalCost = stayCost + foodCost + activityCost + transportCost + miscCost;

  return {
    destination,
    summary: `A personalized ${numDays}-day ${travelType} trip to ${destination} for ${travelers} travelers focusing on ${interests.join(', ')}.`,
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
      'Book shared transportation along Mall Road to save money.',
      'Try local bakeries for affordable and delicious lunch options.',
      'Start morning activities early to beat crowds.'
    ],
    packingSuggestions: [
      'Comfortable walking shoes',
      'Warm layer/jacket for cool evenings',
      'Reusable water bottle & power bank'
    ],
    // Legacy support
    tripTitle: `${numDays}-Day ${pace} ${travelType} Trip to ${destination}`,
    userBudget: userBudgetNum,
    travelers,
    travelType,
    pace,
    startDate,
    itineraryDays: daysList.map(d => ({
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
        category: interests[idx % interests.length] || 'Nature',
        transportationSuggestion: a.transportation
      }))
    })),
    budgetSummary: {
      totalEstimatedCost: estimatedTotalCost,
      userBudget: userBudgetNum,
      remainingAmount: userBudgetNum - estimatedTotalCost,
      stayCost,
      foodCost,
      transportCost,
      activityCost,
      miscCost,
      perPersonDaily: Math.round(estimatedTotalCost / (numDays * travelers)),
      currency: 'INR'
    },
    isFallback: true
  };
}

