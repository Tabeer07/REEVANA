/**
 * Reusable Transportation Data Model for Tourist Locations
 * 
 * Provides structured transit options between starting locations and destinations.
 * Prices are labeled as "Estimated fare" / "Approximate cost".
 */

export const TRANSPORT_DATA_MAP = {
  'george-everest': {
    from: 'Mussoorie Mall Road',
    to: 'George Everest Peak',
    distanceKm: 8,
    recommendedType: 'taxi',
    recommendedReason: 'Best balance of mountain road travel time and convenience.',
    options: [
      {
        type: 'bus',
        label: 'Public Bus / Shared Auto',
        icon: '🚌',
        estimatedCostMin: 50,
        estimatedCostMax: 80,
        estimatedTimeMinutes: 50,
        distanceKm: 8,
        comfort: 'Moderate',
        convenience: 'Medium',
        recommended: false,
        notes: 'Shared auto to Hathipaon Junction, then 1.5 km scenic uphill walk.'
      },
      {
        type: 'taxi',
        label: 'Private Taxi',
        icon: '🚕',
        estimatedCostMin: 400,
        estimatedCostMax: 700,
        estimatedTimeMinutes: 30,
        distanceKm: 8,
        comfort: 'High',
        convenience: 'High',
        recommended: true,
        notes: 'Good option for 2–4 travelers. Direct drop at peak base parking.'
      },
      {
        type: 'rental',
        label: 'Rental Scooter / Car',
        icon: '🚗',
        estimatedCostMin: 800,
        estimatedCostMax: 1200,
        estimatedTimeMinutes: 25,
        distanceKm: 8,
        comfort: 'High',
        convenience: 'High',
        recommended: false,
        notes: 'Per day rental rate. Self-drive up Hathipaon road.'
      },
      {
        type: 'walking',
        label: 'Nature Trek Walk',
        icon: '🚶',
        estimatedCostMin: 0,
        estimatedCostMax: 0,
        estimatedTimeMinutes: 135,
        distanceKm: 8,
        comfort: 'Active',
        convenience: 'Low',
        recommended: false,
        notes: 'Scenic 8 km mountain trek along pine ridge for experienced hikers.'
      }
    ]
  },
  'kempty-falls': {
    from: 'Library Chowk, Mussoorie',
    to: 'Kempty Falls',
    distanceKm: 15,
    recommendedType: 'taxi',
    recommendedReason: 'Shared or private taxi is fastest and most reliable for 15 km hill descent.',
    options: [
      {
        type: 'bus',
        label: 'Local Shared Taxi / Bus',
        icon: '🚌',
        estimatedCostMin: 60,
        estimatedCostMax: 100,
        estimatedTimeMinutes: 45,
        distanceKm: 15,
        comfort: 'Moderate',
        convenience: 'Medium',
        recommended: false,
        notes: 'Frequent shared jeeps leave from Library Chowk stand.'
      },
      {
        type: 'taxi',
        label: 'Private Tourist Taxi',
        icon: '🚕',
        estimatedCostMin: 600,
        estimatedCostMax: 900,
        estimatedTimeMinutes: 35,
        distanceKm: 15,
        comfort: 'High',
        convenience: 'High',
        recommended: true,
        notes: 'Includes return wait time of 1-2 hours.'
      },
      {
        type: 'rental',
        label: 'Rental Bike / Car',
        icon: '🚗',
        estimatedCostMin: 700,
        estimatedCostMax: 1100,
        estimatedTimeMinutes: 30,
        distanceKm: 15,
        comfort: 'High',
        convenience: 'High',
        recommended: false,
        notes: 'Flexible option to stop at scenic valley viewpoints en route.'
      }
    ]
  },
  'gun-hill': {
    from: 'Mall Road Promenade',
    to: 'Gun Hill Viewpoint',
    distanceKm: 1.5,
    recommendedType: 'ropeway',
    recommendedReason: 'Ropeway cable car offers 400ft aerial views over the hills.',
    options: [
      {
        type: 'ropeway',
        label: 'Ropeway Cable Car',
        icon: '🚡',
        estimatedCostMin: 150,
        estimatedCostMax: 250,
        estimatedTimeMinutes: 10,
        distanceKm: 0.8,
        comfort: 'High',
        convenience: 'High',
        recommended: true,
        notes: 'Return ticket price per person with 360-degree aerial panorama.'
      },
      {
        type: 'walking',
        label: 'Uphill Heritage Walk',
        icon: '🚶',
        estimatedCostMin: 0,
        estimatedCostMax: 0,
        estimatedTimeMinutes: 30,
        distanceKm: 1.5,
        comfort: 'Moderate',
        convenience: 'High',
        recommended: false,
        notes: 'Paved winding foot trail starting behind Jhula Ghar.'
      }
    ]
  },
  'landour-char-dukan': {
    from: 'Mussoorie Mall Road',
    to: 'Char Dukan, Landour',
    distanceKm: 3.5,
    recommendedType: 'walking',
    recommendedReason: 'Landour is a eco-sensitive walking zone best explored on foot.',
    options: [
      {
        type: 'walking',
        label: 'Walking Nature Trail',
        icon: '🚶',
        estimatedCostMin: 0,
        estimatedCostMax: 0,
        estimatedTimeMinutes: 45,
        distanceKm: 3.5,
        comfort: 'Moderate',
        convenience: 'High',
        recommended: true,
        notes: 'Walk via Mullingar Chowk under pine canopy.'
      },
      {
        type: 'taxi',
        label: 'Local Auto / Cab',
        icon: '🚕',
        estimatedCostMin: 250,
        estimatedCostMax: 400,
        estimatedTimeMinutes: 15,
        distanceKm: 3.5,
        comfort: 'High',
        convenience: 'High',
        recommended: false,
        notes: 'Narrow steep roads; drop-off near Sister’s Bazaar.'
      }
    ]
  }
};

/**
 * Helper to retrieve or generate transit options for any place name
 */
export const getTransportForLocation = (placeName = '', originName = 'Mall Road') => {
  const normalizedKey = String(placeName).toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  for (const key of Object.keys(TRANSPORT_DATA_MAP)) {
    if (normalizedKey.includes(key) || key.includes(normalizedKey)) {
      return TRANSPORT_DATA_MAP[key];
    }
  }

  // Default fallback transportation structure
  return {
    from: originName,
    to: placeName || 'Tourist Attraction',
    distanceKm: 5.5,
    recommendedType: 'taxi',
    recommendedReason: 'Best balance of travel time and convenience.',
    options: [
      {
        type: 'bus',
        label: 'Public Bus / Shared Auto',
        icon: '🚌',
        estimatedCostMin: 40,
        estimatedCostMax: 80,
        estimatedTimeMinutes: 35,
        distanceKm: 5.5,
        comfort: 'Moderate',
        convenience: 'Medium',
        recommended: false,
        notes: 'Shared local transit route. Approximate fare: ₹40–₹80.'
      },
      {
        type: 'taxi',
        label: 'Private Cab',
        icon: '🚕',
        estimatedCostMin: 300,
        estimatedCostMax: 500,
        estimatedTimeMinutes: 20,
        distanceKm: 5.5,
        comfort: 'High',
        convenience: 'High',
        recommended: true,
        notes: 'Direct cab. Approximate cost: ₹300–₹500.'
      },
      {
        type: 'walking',
        label: 'Walking Trail',
        icon: '🚶',
        estimatedCostMin: 0,
        estimatedCostMax: 0,
        estimatedTimeMinutes: 60,
        distanceKm: 5.5,
        comfort: 'Active',
        convenience: 'Medium',
        recommended: false,
        notes: 'Walking trail feasible if staying nearby.'
      }
    ]
  };
};
