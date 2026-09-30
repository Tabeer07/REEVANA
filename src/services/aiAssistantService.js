/**
 * REEVANA AI Assistant Frontend Service
 * Connects client chat UI to POST /api/ai/chat
 */

export const sendChatMessage = async (message, history = [], tripContext = {}) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        history,
        tripContext
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Error status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn('[AI Assistant Service]: Chat API call failed or timed out. Falling back to smart offline assistant.', error);
    
    // Smart offline fallback
    const msgLower = String(message).toLowerCase();
    const dest = tripContext.destination || 'Mussoorie';

    let reply = `Here is information for your trip to ${dest}:\n\n• **Transit:** Local shared taxis and autos operate frequently (~₹50–₹100/person).\n• **Highlights:** Mall Road, Kempty Falls, Landour Char Dukan, and George Everest Peak.\n• **Budget:** Keep daily meals around ₹600–₹900 per person at local eateries.`;

    if (msgLower.includes('george everest') || msgLower.includes('reach') || msgLower.includes('transportation')) {
      reply = `To reach George Everest Peak from Mall Road, Mussoorie:\n\n• 🚕 **Taxi:** ₹400–₹700 (25–30 min direct)\n• 🚌 **Bus/Shared Auto:** ₹50–₹80 to Hathipaon junction\n• 🚗 **Rental Scooter:** ₹800–₹1,200/day\n\n💡 *Best option:* Private taxi provides the most comfortable and fast travel up the hill.`;
    } else if (msgLower.includes('rain') || msgLower.includes('weather')) {
      reply = `Rainy day suggestions in ${dest}:\n\n1. Visit Char Dukan & Landour Bakehouse for hot beverages and bakery treats.\n2. Explore Mussoorie Heritage Centre & indoor art galleries.\n3. Relax at covered Mall Road cafes overlooking mist-filled valleys.`;
    } else if (msgLower.includes('5000') || msgLower.includes('5,000') || msgLower.includes('budget') || msgLower.includes('optimize')) {
      reply = `To optimize your trip within ₹5,000:\n\n• **Stay:** Guesthouse near Library Chowk (~₹1,200/night)\n• **Food:** Street food stalls & casual dhabas (~₹500/day)\n• **Transit:** Shared autos & walking (~₹150/day)\n• **Activities:** Free scenic walks along Camel's Back Road & Gun Hill trek!`;
    }

    return {
      reply,
      updatedItinerary: null,
      provider: 'REEVANA Smart Fallback Assistant',
      isFallback: true
    };
  }
};
