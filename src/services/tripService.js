import { getStoredToken } from './authService';

export async function fetchUserTrips() {
  const token = getStoredToken();
  if (!token) return { allTrips: [], upcoming: [], past: [], draft: [] };

  const response = await fetch('/api/trips', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user trips.');
  }

  return await response.json();
}

export async function fetchTripById(tripId) {
  const token = getStoredToken();
  if (!token) throw new Error('Authentication required.');

  const response = await fetch(`/api/trips/${tripId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch trip details.');
  }

  return data.trip;
}

export async function saveTrip(tripPayload) {
  const token = getStoredToken();
  if (!token) throw new Error('You must be logged in to save trips to your account.');

  const response = await fetch('/api/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(tripPayload)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to save trip.');
  }

  return data.trip;
}

export async function updateTrip(tripId, updatePayload) {
  const token = getStoredToken();
  if (!token) throw new Error('Authentication required.');

  const response = await fetch(`/api/trips/${tripId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatePayload)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to update trip.');
  }

  return data.trip;
}

export async function deleteTrip(tripId) {
  const token = getStoredToken();
  if (!token) throw new Error('Authentication required.');

  const response = await fetch(`/api/trips/${tripId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to delete trip.');
  }

  return true;
}
