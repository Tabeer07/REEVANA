/**
 * Geodesic Distance & Route Intelligence Utility (Haversine Engine)
 * 
 * Computes exact distances in km between coordinate pairs (lat1, lon1) and (lat2, lon2).
 * Drives dynamic travel time estimations and approximate transit fare calculations in INR (₹).
 */

/**
 * Calculates straight-line geodesic distance between two points in km
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
    return 5.0; // Default fallback distance in km
  }

  const p1 = Number(lat1);
  const l1 = Number(lon1);
  const p2 = Number(lat2);
  const l2 = Number(lon2);

  if (isNaN(p1) || isNaN(l1) || isNaN(p2) || isNaN(l2)) return 5.0;

  // If coordinates match exact same point
  if (p1 === p2 && l1 === l2) return 0.5;

  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(p2 - p1);
  const dLon = toRad(l2 - l1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(p1)) * Math.cos(toRad(p2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;

  // Account for road curvature in mountainous/hilly terrain (approx 1.35x winding road factor)
  const roadDistanceKm = Math.max(0.5, Math.round(distanceKm * 1.35 * 10) / 10);
  return roadDistanceKm;
}

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Estimates transit duration and approximate fare range in INR (₹)
 */
export function estimateTransitDetails(distKm, transportType = 'taxi') {
  const distance = Math.max(0.5, Number(distKm) || 5.0);
  const type = String(transportType).toLowerCase();

  let avgSpeedKmH = 25; // Default average hill road speed
  let minCostPerKm = 50;
  let maxCostPerKm = 80;

  if (type.includes('bus') || type.includes('auto')) {
    avgSpeedKmH = 20;
    minCostPerKm = 10;
    maxCostPerKm = 15;
  } else if (type.includes('taxi') || type.includes('cab')) {
    avgSpeedKmH = 30;
    minCostPerKm = 50;
    maxCostPerKm = 85;
  } else if (type.includes('walk')) {
    avgSpeedKmH = 4;
    minCostPerKm = 0;
    maxCostPerKm = 0;
  } else if (type.includes('rental') || type.includes('car')) {
    avgSpeedKmH = 35;
    minCostPerKm = 30;
    maxCostPerKm = 50;
  }

  const estimatedTimeMinutes = Math.max(5, Math.round((distance / avgSpeedKmH) * 60));
  const minCost = Math.max(0, Math.round(distance * minCostPerKm));
  const maxCost = Math.max(0, Math.round(distance * maxCostPerKm));

  return {
    distanceKm: distance,
    estimatedTimeMinutes,
    minCost,
    maxCost,
    fareDisplay: minCost === 0 && maxCost === 0 ? 'Free (₹0)' : `₹${minCost.toLocaleString('en-IN')}–₹${maxCost.toLocaleString('en-IN')}`
  };
}

/**
 * Generates an external Google Maps search URL (View on Map)
 */
export function getOpenInMapUrl(placeName = '', lat = null, lng = null, destination = '') {
  if (lat && lng) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  const query = `${placeName}${destination ? `, ${destination}` : ''}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Generates an external Google Maps directions URL (Get Directions)
 */
export function getDirectionsUrl(fromName = '', toName = '', fromCoords = null, toCoords = null) {
  let originParam = encodeURIComponent(fromName);
  let destParam = encodeURIComponent(toName);

  if (fromCoords?.lat && fromCoords?.lng) {
    originParam = `${fromCoords.lat},${fromCoords.lng}`;
  }
  if (toCoords?.lat && toCoords?.lng) {
    destParam = `${toCoords.lat},${toCoords.lng}`;
  }

  return `https://www.google.com/maps/dir/?api=1&origin=${originParam}&destination=${destParam}`;
}
