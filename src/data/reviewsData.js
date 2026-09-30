// Mock Review Dataset and Utility Functions for Tourist Places, Restaurants, Hotels, and Activities

export const INITIAL_REVIEWS = [
  // Tourist Places
  {
    id: 'rev-1',
    targetId: 'fushimi-inari',
    targetType: 'place',
    targetName: 'Fushimi Inari Taisha Shrine',
    category: 'Tourist place',
    rating: 5,
    userName: 'Sophia Martinez',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-28',
    writtenReview: 'Absolutely mesmerizing! Walking through thousands of vermilion torii gates early in the morning was the highlight of our Kyoto trip. Go before 7:30 AM to beat the crowds.',
    positives: ['Location & Scenery', 'Atmosphere', 'Free Entry'],
    negatives: ['Crowded at Base', 'Steep Stairs']
  },
  {
    id: 'rev-2',
    targetId: 'fushimi-inari',
    targetType: 'place',
    targetName: 'Fushimi Inari Taisha Shrine',
    category: 'Tourist place',
    rating: 4,
    userName: 'David Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-15',
    writtenReview: 'Stunning place with rich cultural history. The trail up Mount Inari is quite steep and takes about 2 hours to hike completely. Parking near the shrine is very limited, so take the train!',
    positives: ['Cultural Significance', 'Location & Scenery'],
    negatives: ['Parking', 'Crowded at Base']
  },
  {
    id: 'rev-3',
    targetId: 'fushimi-inari',
    targetType: 'place',
    targetName: 'Fushimi Inari Taisha Shrine',
    category: 'Tourist place',
    rating: 5,
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: '2026-07-22',
    writtenReview: 'Breathtaking photo opportunities at every turn. Higher up the mountain path it becomes so tranquil and calm.',
    positives: ['Location & Scenery', 'Atmosphere'],
    negatives: []
  },
  {
    id: 'rev-4',
    targetId: 'oia-caldera-cliffside',
    targetType: 'place',
    targetName: 'Oia Castle & Sunset Viewpoint',
    category: 'Tourist place',
    rating: 5,
    userName: 'Lucas Vance',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-30',
    writtenReview: 'The iconic Aegean sunset view is worth every second. Arrive 2 hours early to secure a viewing position on the stone walls.',
    positives: ['Sunset View', 'Architecture', 'Photo Spots'],
    negatives: ['Extreme Crowds', 'Limited Seating']
  },
  {
    id: 'rev-5',
    targetId: 'colosseum-underground',
    targetType: 'place',
    targetName: 'Colosseum & Roman Forum Night Access',
    category: 'Tourist place',
    rating: 5,
    userName: 'Amara Okafor',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-10',
    writtenReview: 'Night tour is unbeatable! You avoid the blistering summer sun and walking through gladiator tunnels in moonlight was unforgettable.',
    positives: ['Guided Tour Quality', 'Night Ambience', 'History'],
    negatives: ['Advance Booking Needed']
  },

  // Restaurants
  {
    id: 'rev-6',
    targetId: 'rest-1',
    targetType: 'restaurant',
    targetName: 'Gion Ichiriki Kaiseki & Matcha',
    category: 'Restaurant',
    rating: 5,
    userName: 'Marcus Sterling',
    userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-25',
    writtenReview: 'An incredible 9-course Kaiseki experience! The Wagyu beef melted in my mouth, and the private courtyard view was magical.',
    positives: ['Exquisite Food Quality', 'Authentic Ambience', 'Attentive Service'],
    negatives: ['Expensive', 'Reservation Required']
  },
  {
    id: 'rev-7',
    targetId: 'rest-1',
    targetType: 'restaurant',
    targetName: 'Gion Ichiriki Kaiseki & Matcha',
    category: 'Restaurant',
    rating: 4,
    userName: 'Claire Dupont',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    date: '2026-07-18',
    writtenReview: 'Phenomenal matcha tea ceremony presentation. High prices, but top-notch quality and pristine garden setting.',
    positives: ['Tea Quality', 'Private Garden View'],
    negatives: ['Expensive']
  },
  {
    id: 'rev-8',
    targetId: 'rest-2',
    targetType: 'restaurant',
    targetName: 'Green Leaf Vegan Café & Smoothie Bar',
    category: 'Restaurant',
    rating: 5,
    userName: 'Hannah Kim',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-19',
    writtenReview: 'Best vegan avocado truffle toast I have ever tasted! Fresh organic ingredients, vibrant decor, and friendly staff.',
    positives: ['Fresh Organic Food', 'Cozy Vibe', 'Healthy Options'],
    negatives: ['Small Seating Area']
  },
  {
    id: 'rev-9',
    targetId: 'rest-3',
    targetType: 'restaurant',
    targetName: 'Nishiki Market Ramen & Yakitori Yatai',
    category: 'Restaurant',
    rating: 4,
    userName: 'Tariq Al-Mansoor',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-05',
    writtenReview: 'Rich tonkotsu broth bursting with garlic flavor and crisp yakitori. Expect short standing room wait times during peak lunch.',
    positives: ['Authentic Flavor', 'Quick Service', 'Affordable'],
    negatives: ['Standing Room Only', 'Noisy Market']
  },

  // Hotels / Stays
  {
    id: 'rev-10',
    targetId: 'stay-1',
    targetType: 'hotel',
    targetName: 'Kyoto Sanctuary Garden Ryokan & Spa',
    category: 'Hotel',
    rating: 5,
    userName: 'Emily Watson',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-29',
    writtenReview: 'Unmatched hospitality and tranquility! The private onsen hot spring bath in our suite was pure luxury after a long day of walking.',
    positives: ['Private Onsen Bath', 'Flawless Service', 'Serene Gardens', 'Traditional Tatami'],
    negatives: ['High Price Point']
  },
  {
    id: 'rev-11',
    targetId: 'stay-1',
    targetType: 'hotel',
    targetName: 'Kyoto Sanctuary Garden Ryokan & Spa',
    category: 'Hotel',
    rating: 5,
    userName: 'Oliver Schmidt',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-14',
    writtenReview: 'Everything was pristine. Kaiseki breakfast served directly in our room was Michelin-worthy. Will definitely return!',
    positives: ['Gourmet Breakfast', 'Cleanliness', 'Location'],
    negatives: []
  },
  {
    id: 'rev-12',
    targetId: 'stay-5',
    targetType: 'hotel',
    targetName: 'Santorini Cliffside Infinity Suites',
    category: 'Hotel',
    rating: 5,
    userName: 'Isabella Rossi',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    date: '2026-07-30',
    writtenReview: 'Waking up to the caldera view from our private plunge pool was a dream come true. Staff carried luggage up the steep stairs with ease.',
    positives: ['Panoramic Views', 'Private Plunge Pool', 'Helpful Staff'],
    negatives: ['Steep Steps']
  },
  {
    id: 'rev-13',
    targetId: 'stay-3',
    targetType: 'hotel',
    targetName: 'Gion Craft Backpackers Hostel',
    category: 'Hotel',
    rating: 4,
    userName: 'Alex Rivera',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-01',
    writtenReview: 'Super clean pod beds with privacy curtains and power outlets. Great community vibe at the evening matcha tasting!',
    positives: ['Affordable', 'Privacy Pods', 'Social Events', 'Cleanliness'],
    negatives: ['Shared Bathrooms']
  },

  // Activities
  {
    id: 'rev-14',
    targetId: 'moraine-lake-canoeing',
    targetType: 'activity',
    targetName: 'Moraine Lake & Rockpile Trail',
    category: 'Activity',
    rating: 5,
    userName: 'Jessica Miller',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-27',
    writtenReview: 'Canoeing on the intense turquoise glacial water surrounded by the Ten Peaks was surreal! Highly recommend booking early shuttle seats.',
    positives: ['Turquoise Water Views', 'Canoeing Experience', 'Rockpile Trail View'],
    negatives: ['Shuttle Reservation Needed', 'Cold Winds']
  },
  {
    id: 'rev-15',
    targetId: 'moraine-lake-canoeing',
    targetType: 'activity',
    targetName: 'Moraine Lake & Rockpile Trail',
    category: 'Activity',
    rating: 5,
    userName: 'Kevin Zhang',
    userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-12',
    writtenReview: 'Unbelievable photo spot. The short walk up the Rockpile Trail gives you the classic postcard view of Banff.',
    positives: ['Scenery & Views', 'Photo Opportunities'],
    negatives: ['Crowded Shuttle Stop']
  },
  {
    id: 'rev-16',
    targetId: 'tegallalang-rice-terrace',
    targetType: 'activity',
    targetName: 'Tegallalang Rice Terraces & Swing',
    category: 'Activity',
    rating: 4,
    userName: 'Maya Patel',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-20',
    writtenReview: 'Stunning emerald terraces and the giant jungle swing was super fun! Wear sturdy shoes because the trails get muddy when it rains.',
    positives: ['Lush Terraces', 'Jungle Swing', 'Subak Heritage'],
    negatives: ['Muddy Paths', 'Hawkers']
  },
  {
    id: 'rev-17',
    targetId: 'trastevere-food-tour',
    targetType: 'activity',
    targetName: 'Trastevere Artisan Gelato & Pasta Walk',
    category: 'Activity',
    rating: 5,
    userName: 'Giacomo Bellini',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    date: '2026-08-08',
    writtenReview: 'Our local guide took us to 5 secret family-owned eateries. The authentic Cacio e Pepe and pistachio gelato were divine!',
    positives: ['Food Tasting Variety', 'Knowledgeable Guide', 'Charming Alleys'],
    negatives: ['Pacing is Fast']
  }
];

// Mock AI Summaries map for target items or fallback generator
export const MOCK_AI_SUMMARIES = {
  'fushimi-inari': 'Visitors frequently praise the breathtaking vermilion gates, peaceful forest hiking trails, and spiritual atmosphere. Parking and initial entrance crowds are the most common complaints.',
  'oia-caldera-cliffside': 'Visitors consistently highlight the world-class sunset views, pristine white architecture, and romantic vibe. Severe evening crowd density and limited seating near the walls are frequent concerns.',
  'colosseum-underground': 'Travelers acclaim the night access for avoiding heatwaves and offering exclusive gladiator tunnel access. High demand requiring weeks-in-advance booking is the primary feedback.',
  'rest-1': 'Guests rave about the exquisite multi-course Kaiseki menu, authentic Japanese hospitality, and peaceful Zen garden. The premium price point and strict reservation policy are noted.',
  'rest-2': 'Reviewers highlight the fresh organic vegan options, creative avocado pairings, and cozy café environment. Limited table capacity during morning peak hours is occasionally mentioned.',
  'rest-3': 'Diners love the rich garlic tonkotsu ramen broth, sizzling skewers, and energetic street food vibe. Limited seating and bustling noise levels are the main takeaways.',
  'stay-1': 'Guests praise the serene private onsen hot springs, traditional tatami elegance, and exceptional room-served Kaiseki meals. High room rates are the only minor drawback.',
  'stay-5': 'Travelers adore the panoramic caldera infinity views and private heated pools. Steep stone stairs navigation with heavy luggage is the primary mention.',
  'stay-3': 'Backpackers commend the clean, private sleep pods, vibrant rooftop social scene, and central location. Shared bathroom peak-hour wait times are occasionally noted.',
  'moraine-lake-canoeing': 'Visitors praise the vibrant turquoise waters, majestic mountain backdrop, and iconic rockpile viewpoint. Shuttle ticket availability and early morning chill are frequent mentions.',
  'tegallalang-rice-terrace': 'Travelers love the vibrant green terraced landscape, ancient Subak culture, and exciting jungle swings. Muddy steps and persistent souvenir vendors are common feedback points.',
  'trastevere-food-tour': 'Participants praise the generous gourmet pasta tastings, expert local storytelling, and hidden bakery stops. Walking speed between stops is occasionally mentioned.'
};

/**
 * Returns a fallback AI summary based on target type or category.
 */
export function getMockAISummary(targetId, targetName, category) {
  if (MOCK_AI_SUMMARIES[targetId]) {
    return MOCK_AI_SUMMARIES[targetId];
  }

  const catLower = (category || '').toLowerCase();
  if (catLower.includes('food') || catLower.includes('restaurant')) {
    return `Diners praise the delicious culinary quality, fresh ingredients, and warm service. Peak hour waiting times and parking availability are the most common complaints.`;
  } else if (catLower.includes('hotel') || catLower.includes('stay')) {
    return `Guests frequently praise the prime location, comfortable rooms, and helpful hospitality. Soundproofing in busy corridors is the most common feedback point.`;
  } else if (catLower.includes('activity')) {
    return `Participants celebrate the engaging local guides, unique experiences, and memorable views. Strict departure times and group sizing are the main points noted.`;
  }
  
  // Default tourist place AI summary as requested in user prompt
  return `Visitors frequently praise the location and scenery. Parking is the most common complaint.`;
}

/**
 * Calculates aggregate rating stats for a given target item or review list:
 * - averageRating
 * - totalReviews
 * - ratingDistribution: { 5: count, 4: count, 3: count, 2: count, 1: count }
 * - distributionPercentages: { 5: %, 4: %, 3: %, 2: %, 1: % }
 * - topPositives: [{ name, count }]
 * - topNegatives: [{ name, count }]
 */
export function calculateReviewStats(reviews = [], baseRating = 4.8, baseCount = 150) {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const positiveCounts = {};
  const negativeCounts = {};

  if (reviews.length === 0) {
    // Generate synthetic realistic distribution based on baseRating & baseCount
    const count5 = Math.round(baseCount * (baseRating >= 4.8 ? 0.8 : 0.65));
    const count4 = Math.round(baseCount * (baseRating >= 4.8 ? 0.15 : 0.25));
    const count3 = Math.round(baseCount * 0.03);
    const count2 = Math.round(baseCount * 0.01);
    const count1 = Math.max(0, baseCount - count5 - count4 - count3 - count2);

    distribution[5] = count5;
    distribution[4] = count4;
    distribution[3] = count3;
    distribution[2] = count2;
    distribution[1] = count1;

    return {
      averageRating: baseRating,
      totalReviews: baseCount,
      ratingDistribution: distribution,
      distributionPercentages: {
        5: Math.round((count5 / baseCount) * 100),
        4: Math.round((count4 / baseCount) * 100),
        3: Math.round((count3 / baseCount) * 100),
        2: Math.round((count2 / baseCount) * 100),
        1: Math.round((count1 / baseCount) * 100)
      },
      topPositives: [
        { name: 'Location & Scenery', count: Math.round(baseCount * 0.65) },
        { name: 'Cleanliness & Atmosphere', count: Math.round(baseCount * 0.48) },
        { name: 'Friendly Staff', count: Math.round(baseCount * 0.35) }
      ],
      topNegatives: [
        { name: 'Parking Availability', count: Math.round(baseCount * 0.18) },
        { name: 'Peak Hour Crowds', count: Math.round(baseCount * 0.12) }
      ]
    };
  }

  let totalRatingSum = 0;
  reviews.forEach(r => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    distribution[star] = (distribution[star] || 0) + 1;
    totalRatingSum += r.rating;

    (r.positives || []).forEach(p => {
      positiveCounts[p] = (positiveCounts[p] || 0) + 1;
    });

    (r.negatives || []).forEach(n => {
      negativeCounts[n] = (negativeCounts[n] || 0) + 1;
    });
  });

  const totalReviews = reviews.length;
  const averageRating = parseFloat((totalRatingSum / totalReviews).toFixed(1));

  const percentages = {};
  [5, 4, 3, 2, 1].forEach(star => {
    percentages[star] = Math.round(((distribution[star] || 0) / totalReviews) * 100);
  });

  const topPositives = Object.entries(positiveCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topNegatives = Object.entries(negativeCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // If reviews provided had no explicit tags, supply standard ones derived from rating
  if (topPositives.length === 0) {
    topPositives.push(
      { name: 'Location & Scenery', count: Math.ceil(totalReviews * 0.7) },
      { name: 'Service Quality', count: Math.ceil(totalReviews * 0.5) }
    );
  }
  if (topNegatives.length === 0) {
    topNegatives.push(
      { name: 'Parking & Access', count: Math.ceil(totalReviews * 0.2) }
    );
  }

  return {
    averageRating,
    totalReviews,
    ratingDistribution: distribution,
    distributionPercentages: percentages,
    topPositives,
    topNegatives
  };
}
