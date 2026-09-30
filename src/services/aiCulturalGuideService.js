/**
 * REEVANA AI Cultural Guide Service Module
 * 
 * Provides simulated LLM conversational responses for historical monuments.
 * 
 * TO CONNECT REAL GEMINI / OPENAI API:
 * Replace `askCulturalAI` with an API call:
 * const response = await fetch('https://api.openai.com/v1/chat/completions', { ... });
 */

export const SUGGESTED_AI_QUESTIONS = [
  'What is the history of this place?',
  'Why is it famous worldwide?',
  'When was it built and by whom?',
  'Are there any hidden legends or myths?'
];

export const askCulturalAI = async (monument, userQuestion) => {
  // Simulate network latency (450ms) to mimic AI stream
  await new Promise(resolve => setTimeout(resolve, 450));

  const qLower = userQuestion.toLowerCase();

  if (qLower.includes('history') || qLower.includes('story')) {
    return `🏛️ **History of ${monument.name}**:\n\n${monument.shortHistory}\n\nDuring the **${monument.historicalPeriod}**, it played a pivotal role in shaping local culture and spiritual tradition. Millions of travelers have walked these grounds over the centuries!`;
  }

  if (qLower.includes('famous') || qLower.includes('why') || qLower.includes('special')) {
    return `⭐ **Why ${monument.name} is World-Famous**:\n\n${monument.culturalSignificance}\n\nKey Highlights:\n- ${monument.interestingFacts[0]}\n- ${monument.interestingFacts[1]}`;
  }

  if (qLower.includes('built') || qLower.includes('when') || qLower.includes('year') || qLower.includes('date')) {
    return `🏗️ **Construction & Era**:\n\n${monument.name} originated in the **${monument.historicalPeriod}** in ${monument.location}.\n\nVisiting Info:\n- **Hours**: ${monument.visitingInfo.openingHours}\n- **Best Time**: ${monument.visitingInfo.bestTimeToVisit}`;
  }

  if (qLower.includes('legend') || qLower.includes('myth') || qLower.includes('secret') || qLower.includes('hidden')) {
    return `🔮 **Hidden Myths & Folklore of ${monument.name}**:\n\nDid you know? ${monument.interestingFacts[2] || monument.interestingFacts[0]}\n\nLocal tradition holds that visitors who walk the full perimeter early in the morning receive good fortune and protection!`;
  }

  // Fallback intelligent answer
  return `✨ **Guide Insights on ${monument.name}**:\n\nRegarding "${userQuestion}": ${monument.shortHistory}\n\n💡 *Pro-tip for visitors*: ${monument.visitingInfo.bestTimeToVisit}. Make sure to observe local dress etiquette (${monument.visitingInfo.dressCode}).`;
};
