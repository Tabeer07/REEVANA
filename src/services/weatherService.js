/**
 * REEVANA Frontend Weather Service Module
 * 
 * Interacts with REEVANA backend weather API (/api/weather)
 * to provide live destination weather metrics, 5-day forecasts, and smart advisories.
 */

const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchLiveWeather(cityName = 'Mussoorie', lat = null, lng = null) {
  try {
    const params = new URLSearchParams();
    if (cityName) params.append('city', cityName);
    if (lat) params.append('lat', lat);
    if (lng) params.append('lng', lng);

    const response = await fetch(`${API_BASE_URL}/weather?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Weather API HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.warn('[Frontend Weather Service]: Backend weather fetch failed, using fallback:', err.message);
    return getFallbackWeather(cityName);
  }
}

export function getDestinationWeather(cityName = 'Mussoorie') {
  return getFallbackWeather(cityName);
}

function getFallbackWeather(cityName = 'Mussoorie') {
  const norm = String(cityName).toLowerCase();
  
  if (norm.includes('paris')) {
    return {
      city: 'Paris, France',
      destinationCity: 'Paris',
      tempC: 14,
      feelsLikeC: 13,
      condition: 'Rainy',
      icon: '🌧️',
      humidity: '78%',
      windSpeed: '18 km/h',
      rainChance: '85%',
      alertBanner: {
        type: 'rain',
        icon: '🌧️',
        title: 'Rain expected',
        message: 'Carry an umbrella and consider indoor alternatives like museums or cafes.'
      },
      forecast5Days: [
        { day: 'Today', date: 'Today', tempC: 14, condition: 'Rainy', icon: '🌧️', rainChance: '85%' },
        { day: 'Thu', date: 'Day 2', tempC: 15, condition: 'Showers', icon: '🌦️', rainChance: '60%' },
        { day: 'Fri', date: 'Day 3', tempC: 16, condition: 'Cloudy', icon: '☁️', rainChance: '30%' },
        { day: 'Sat', date: 'Day 4', tempC: 17, condition: 'Sunny', icon: '☀️', rainChance: '10%' },
        { day: 'Sun', date: 'Day 5', tempC: 15, condition: 'Partly Cloudy', icon: '⛅', rainChance: '20%' }
      ]
    };
  }

  // Default Mussoorie Weather Fallback
  return {
    city: 'Mussoorie, Uttarakhand',
    destinationCity: 'Mussoorie',
    tempC: 24,
    feelsLikeC: 23,
    condition: 'Partly Cloudy',
    icon: '⛅',
    humidity: '65%',
    windSpeed: '12 km/h',
    rainChance: '20%',
    alertBanner: null,
    forecast5Days: [
      { day: 'Today', date: 'Today', tempC: 24, condition: 'Partly Cloudy', icon: '⛅', rainChance: '20%' },
      { day: 'Thu', date: 'Day 2', tempC: 23, condition: 'Sunny', icon: '☀️', rainChance: '10%' },
      { day: 'Fri', date: 'Day 3', tempC: 21, condition: 'Light Rain', icon: '🌧️', rainChance: '45%' },
      { day: 'Sat', date: 'Day 4', tempC: 22, condition: 'Clear', icon: '🌤️', rainChance: '15%' },
      { day: 'Sun', date: 'Day 5', tempC: 25, condition: 'Sunny', icon: '☀️', rainChance: '5%' }
    ]
  };
}
