/**
 * REEVANA Authentication Service
 * Secure token management & API calls
 */

const TOKEN_KEY = 'reevana_auth_token';

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY) || null;
}

export function setStoredToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export { fetchCurrentUser as getCurrentUser, clearStoredToken as logout };

export async function loginUser(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Login failed. Please check your credentials.');
  }

  setStoredToken(data.token);
  return data;
}

export async function signupUser(name, email, password, confirmPassword) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, confirmPassword })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Registration failed. Please check your input.');
  }

  setStoredToken(data.token);
  return data;
}

export async function fetchCurrentUser() {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const response = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      clearStoredToken();
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (err) {
    return null;
  }
}

export async function updateProfile(profileData) {
  const token = getStoredToken();
  if (!token) throw new Error('You must be logged in to update your profile.');

  const response = await fetch('/api/auth/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to update profile preferences.');
  }

  return data.user;
}

export async function requestPasswordReset(email) {
  const response = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Password reset request failed.');
  }
  return data;
}
