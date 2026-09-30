export const MOCK_USER_PROFILE = {
  name: 'Alex Morgan',
  email: 'alex.morgan@reevana.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  tier: 'Explorer Passport Member',
  homeCity: 'New Delhi, India',
  memberSince: 'March 2025'
};

export const MOCK_UPCOMING_TRIPS = [
  {
    id: 'trip-101',
    destination: 'Mussoorie & Landour, Uttarakhand',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    dates: 'Oct 12 – Oct 15, 2026',
    days: 4,
    budget: 15000,
    currentSpending: 9500,
    status: 'Upcoming',
    itineraryPreview: [
      'Day 1: Library Chowk & Mall Road Culinary Walk',
      'Day 2: Kempty Falls & Company Garden Exploration',
      'Day 3: George Everest Peak Trek & Landour Char Dukan'
    ]
  },
  {
    id: 'trip-102',
    destination: 'Kyoto & Osaka, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    dates: 'Dec 02 – Dec 08, 2026',
    days: 6,
    budget: 45000,
    currentSpending: 28000,
    status: 'Planning',
    itineraryPreview: [
      'Day 1: Fushimi Inari Shrine & Gion Geisha District',
      'Day 2: Kinkaku-ji Golden Pavilion & Arashiyama Bamboo',
      'Day 3: Shinkansen Express to Osaka & Dotonbori Street Food'
    ]
  },
  {
    id: 'trip-103',
    destination: 'Goa Coastal Getaway',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    dates: 'Apr 15 – Apr 19, 2027',
    days: 5,
    budget: 22000,
    currentSpending: 4500,
    status: 'Draft',
    itineraryPreview: [
      'Day 1: Fontainhas Latin Quarter & Panaji Heritage Walk',
      'Day 2: Calangute & Baga Sunset Watersports',
      'Day 3: Dudhsagar Falls Trek & Spice Plantation Tour'
    ]
  }
];

export const MOCK_SAVED_DESTINATIONS = [
  {
    id: 'dest-1',
    name: 'George Everest Peak',
    city: 'Mussoorie, India',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    category: 'Nature & Adventure'
  },
  {
    id: 'dest-2',
    name: 'Fushimi Inari Shrine',
    city: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    category: 'Culture'
  },
  {
    id: 'dest-3',
    name: 'Kempty Falls',
    city: 'Mussoorie, India',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    category: 'Nature'
  }
];

export const MOCK_SAVED_RESTAURANTS = [
  {
    id: 'rest-1',
    name: 'Char Dukan Heritage Cafe',
    cuisine: 'Hill Station Bakery & Chai',
    city: 'Landour, Mussoorie',
    rating: 4.9,
    price: '₹₹',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rest-2',
    name: 'Lovely Omelette Centre',
    cuisine: 'Street Food & Snacks',
    city: 'Mall Road, Mussoorie',
    rating: 4.8,
    price: '₹',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80'
  }
];

export const MOCK_SAVED_HOTELS = [
  {
    id: 'stay-1',
    name: 'JW Marriott Mussoorie Walnut Grove Resort',
    type: 'Luxury Hill Resort',
    city: 'Mussoorie',
    pricePerNight: '₹14,500',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'stay-2',
    name: 'Rokeby Manor Heritage Hotel',
    type: 'Colonial Boutique Lodge',
    city: 'Landour, Mussoorie',
    pricePerNight: '₹8,500',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80'
  }
];

export const MOCK_BUDGET_SUMMARY = {
  totalAllocated: 50000,
  totalSpent: 27000,
  remaining: 23000,
  spendingPercentage: 54
};

export const MOCK_RECENT_ACTIVITIES = [
  {
    id: 'act-1',
    title: 'Saved Hotel Reservation',
    description: 'Bookmarked "Rokeby Manor Heritage Hotel" for Landour trip',
    time: '2 hours ago',
    icon: 'Hotel'
  },
  {
    id: 'act-2',
    title: 'Itinerary Updated',
    description: 'Added "George Everest Peak Sunset Trek" to Day 3 of Mussoorie trip',
    time: 'Yesterday',
    icon: 'Calendar'
  },
  {
    id: 'act-3',
    title: 'Budget Expense Calculated',
    description: 'Allocated ₹15,000 total budget for upcoming Mussoorie vacation',
    time: '3 days ago',
    icon: 'Wallet'
  },
  {
    id: 'act-4',
    title: 'Emergency SOS Contact Setup',
    description: 'Verified emergency helpline numbers for Mussoorie Tourist Center',
    time: '5 days ago',
    icon: 'ShieldCheck'
  }
];

