/**
 * REEVANA Transportation Service Module
 * 
 * Calculates route transit options for Walking, Bus, Metro/Shared Auto, Taxi, and Rental Car.
 * 
 * DATA ACCURACY NOTE:
 * All prices are labeled as Estimated fare / Approximate cost.
 * Real maps/routing APIs can be connected later.
 */

export const calculateRouteOptions = (origin = 'Mussoorie Mall Road', destination = 'George Everest') => {
  const mockDistanceKm = 8.2;

  return {
    origin: origin || 'Mussoorie Mall Road',
    destination: destination || 'George Everest',
    distanceKm: mockDistanceKm,
    options: [
      {
        id: 'taxi',
        mode: 'Taxi / Private Cab',
        time: '30 min',
        costMin: 400,
        costMax: 700,
        costFormatted: '₹400–₹700',
        distance: `${mockDistanceKm} km`,
        convenienceRating: 4.95,
        comfort: 'High',
        tag: 'Best for Comfort & Speed',
        tagColor: 'amber',
        recommended: true,
        details: 'Direct cab from Mall Road taxi stand to George Everest Estate parking. Approximate cost: ₹400–₹700.'
      },
      {
        id: 'bus',
        mode: 'Public Bus / Shared Auto',
        time: '50 min',
        costMin: 50,
        costMax: 80,
        costFormatted: '₹50–₹80',
        distance: `${mockDistanceKm} km`,
        convenienceRating: 4.2,
        comfort: 'Moderate',
        tag: 'Best for Budget',
        recommended: false,
        details: 'Shared maxicab/bus from Library Chowk to Hathipaon junction, followed by a short walk. Estimated fare: ₹50–₹80.'
      },
      {
        id: 'rental',
        mode: 'Rental Scooter / Car',
        time: '25 min',
        costMin: 800,
        costMax: 1200,
        costFormatted: '₹800–₹1,200/day',
        distance: `${mockDistanceKm} km`,
        convenienceRating: 4.6,
        comfort: 'High',
        tag: 'Best for Flexibility',
        recommended: false,
        details: 'Self-drive rental vehicle. Parking available at base station. Approximate cost: ₹800–₹1,200/day.'
      },
      {
        id: 'walking',
        mode: 'Scenic Nature Hike',
        time: '2h 15m',
        costMin: 0,
        costMax: 0,
        costFormatted: 'Free (₹0)',
        distance: `${mockDistanceKm} km`,
        convenienceRating: 3.8,
        comfort: 'Active',
        tag: 'Eco-Friendly Trek',
        recommended: false,
        details: 'Scenic mountain walking trail through pine and deodar forest paths from Library Chowk.'
      }
    ]
  };
};

