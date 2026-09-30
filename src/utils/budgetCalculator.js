export const RATES = {
  accommodation: {
    'Hostel / Guesthouse': 800,
    'Mid-range Hotel': 3500,
    'Luxury Resort': 12000,
  },
  food: {
    'Street Food & Local Eats': 300,
    'Casual Dining & Cafes': 900,
    'Fine Dining & Gourmet': 2500,
  },
  transportation: {
    'Public Metro / Bus': 150,
    'Rental Car': 1500,
    'Private Taxi & Cabs': 2500,
  },
  activities: {
    'Free Landmarks & Parks': 100,
    'Standard Museums & Passes': 500,
    'VIP Tours & Extreme Adventure': 2500,
  }
};

export const calculateBudget = (params) => {
  const {
    totalBudget = 10000,
    days = 3,
    travelers = 2,
    currencySymbol = '₹',
    accommodationPref = 'Mid-range Hotel',
    foodPref = 'Casual Dining & Cafes',
    transportPref = 'Public Metro / Bus',
    activitiesPref = 'Standard Museums & Passes',
  } = params;

  // 1. Accommodation Cost (calculated per room, assuming 1 room per 2 travelers)
  const roomsNeeded = Math.ceil(travelers / 2);
  const stayRatePerNight = RATES.accommodation[accommodationPref] || 3500;
  const accommodationCost = stayRatePerNight * days * roomsNeeded;

  // 2. Food Cost (calculated per traveler per day)
  const foodRatePerDay = RATES.food[foodPref] || 900;
  const foodCost = foodRatePerDay * days * travelers;

  // 3. Transportation Cost
  const transportRate = RATES.transportation[transportPref] || 150;
  const transportCost = (transportPref === 'Rental Car' || transportPref === 'Private Taxi & Cabs')
    ? transportRate * days
    : transportRate * days * travelers;

  // 4. Activities Cost (per traveler per day)
  const activityRate = RATES.activities[activitiesPref] || 500;
  const activitiesCost = activityRate * days * travelers;

  // 5. Shopping Cost (estimated baseline per traveler)
  const shoppingCost = Math.round(200 * days * travelers);

  // Subtotal before emergency buffer
  const subtotal = accommodationCost + foodCost + transportCost + activitiesCost + shoppingCost;

  // 6. Emergency / Miscellaneous (7% of subtotal)
  const emergencyCost = Math.round(subtotal * 0.07);

  // Total Estimated Cost
  const totalEstimatedCost = subtotal + emergencyCost;

  // Remaining budget or over budget deficit
  const remainingBudget = totalBudget - totalEstimatedCost;
  const isOverBudget = remainingBudget < 0;
  const overAmount = Math.abs(remainingBudget);

  // Averages
  const perDayAvg = Math.round(totalEstimatedCost / days);
  const perPersonCost = Math.round(totalEstimatedCost / travelers);

  // Cheaper alternatives generation if over budget or optimizing
  const cheaperAlternatives = [];

  if (accommodationPref === 'Luxury Resort') {
    const saved = (RATES.accommodation['Luxury Resort'] - RATES.accommodation['Mid-range Hotel']) * days * roomsNeeded;
    cheaperAlternatives.push({
      id: 'alt-stay',
      title: 'Switch Accommodation to Mid-range Boutique Hotel',
      savings: saved,
      type: 'accommodation',
      targetVal: 'Mid-range Hotel',
      desc: 'Save on luxury room rates while enjoying high-rated central locations.'
    });
  } else if (accommodationPref === 'Mid-range Hotel') {
    const saved = (RATES.accommodation['Mid-range Hotel'] - RATES.accommodation['Hostel / Guesthouse']) * days * roomsNeeded;
    cheaperAlternatives.push({
      id: 'alt-stay-hostel',
      title: 'Opt for Private Rooms in Boutique Hostels',
      savings: saved,
      type: 'accommodation',
      targetVal: 'Hostel / Guesthouse',
      desc: 'Private rooms in modern hostels offer privacy at half the cost.'
    });
  }

  if (foodPref === 'Fine Dining & Gourmet') {
    const saved = (RATES.food['Fine Dining & Gourmet'] - RATES.food['Casual Dining & Cafes']) * days * travelers;
    cheaperAlternatives.push({
      id: 'alt-food',
      title: 'Mix Casual Dining with 1 Special Fine Dining Night',
      savings: saved,
      type: 'food',
      targetVal: 'Casual Dining & Cafes',
      desc: 'Enjoy authentic local eateries and save expensive fine dining for special evenings.'
    });
  } else if (foodPref === 'Casual Dining & Cafes') {
    const saved = (RATES.food['Casual Dining & Cafes'] - RATES.food['Street Food & Local Eats']) * days * travelers;
    cheaperAlternatives.push({
      id: 'alt-food-street',
      title: 'Enjoy Street Food & Local Food Markets',
      savings: saved,
      type: 'food',
      targetVal: 'Street Food & Local Eats',
      desc: 'Street food markets offer authentic local flavors at budget prices.'
    });
  }

  if (transportPref === 'Private Taxi & Cabs') {
    const saved = (RATES.transportation['Private Taxi & Cabs'] - RATES.transportation['Public Metro / Bus']) * days;
    cheaperAlternatives.push({
      id: 'alt-transit',
      title: 'Use Shared Cabs or City Bus Day Pass',
      savings: saved,
      type: 'transportation',
      targetVal: 'Public Metro / Bus',
      desc: 'Public transit & shared autos offer reliable daily travel without surge pricing.'
    });
  }

  if (activitiesPref === 'VIP Tours & Extreme Adventure') {
    const saved = (RATES.activities['VIP Tours & Extreme Adventure'] - RATES.activities['Standard Museums & Passes']) * days * travelers;
    cheaperAlternatives.push({
      id: 'alt-act',
      title: 'Choose Combined Sightseeing & Heritage Pass',
      savings: saved,
      type: 'activities',
      targetVal: 'Standard Museums & Passes',
      desc: 'City passes cover major top landmarks at discounted bundled rates.'
    });
  }

  return {
    totalBudget,
    totalEstimatedCost,
    remainingBudget,
    isOverBudget,
    overAmount,
    perDayAvg,
    perPersonCost,
    currencySymbol,
    categories: [
      { name: 'Accommodation', amount: accommodationCost, percentage: Math.round((accommodationCost / totalEstimatedCost) * 100), color: 'sky' },
      { name: 'Food & Dining', amount: foodCost, percentage: Math.round((foodCost / totalEstimatedCost) * 100), color: 'rose' },
      { name: 'Transportation', amount: transportCost, percentage: Math.round((transportCost / totalEstimatedCost) * 100), color: 'emerald' },
      { name: 'Activities', amount: activitiesCost, percentage: Math.round((activitiesCost / totalEstimatedCost) * 100), color: 'amber' },
      { name: 'Shopping', amount: shoppingCost, percentage: Math.round((shoppingCost / totalEstimatedCost) * 100), color: 'purple' },
      { name: 'Emergency / Misc', amount: emergencyCost, percentage: Math.round((emergencyCost / totalEstimatedCost) * 100), color: 'cyan' },
    ],
    cheaperAlternatives
  };
};

