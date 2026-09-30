import { getStoredToken } from './authService';

export async function fetchSavedItems(category = 'All') {
  const token = getStoredToken();
  if (!token) return { savedItems: [], counts: { total: 0, places: 0, restaurants: 0, hotels: 0, activities: 0 } };

  const response = await fetch(`/api/saved?category=${encodeURIComponent(category)}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch saved places.');
  }

  return await response.json();
}

export async function saveItem(itemPayload) {
  const token = getStoredToken();
  if (!token) throw new Error('You must be logged in to save places.');

  const response = await fetch('/api/saved', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(itemPayload)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to save item.');
  }

  return data.savedItem;
}

export async function deleteSavedItem(savedId) {
  const token = getStoredToken();
  if (!token) throw new Error('Authentication required.');

  const response = await fetch(`/api/saved/${savedId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to remove saved item.');
  }

  return true;
}

export async function addSavedItemToTrip(savedId, tripId, day, time) {
  const token = getStoredToken();
  if (!token) throw new Error('Authentication required.');

  const response = await fetch(`/api/saved/${savedId}/add-to-trip`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ tripId, day, time })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to add item to trip.');
  }

  return data;
}
