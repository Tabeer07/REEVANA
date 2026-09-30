import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(collectionName) {
  return path.join(DATA_DIR, `${collectionName}.json`);
}

function readCollection(collectionName) {
  const filePath = getFilePath(collectionName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error(`[Database Error] Reading ${collectionName}:`, err.message);
    return [];
  }
}

function writeCollection(collectionName, items) {
  const filePath = getFilePath(collectionName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf-8');
  } catch (err) {
    console.error(`[Database Error] Writing ${collectionName}:`, err.message);
  }
}

export const db = {
  // USERS COLLECTION
  findUserByEmail(email) {
    if (!email) return null;
    const users = readCollection('users');
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  findUserById(id) {
    const users = readCollection('users');
    return users.find(u => u.id === id);
  },

  createUser(userData) {
    const users = readCollection('users');
    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      travelStyle: 'Budget',
      interests: ['Nature', 'Food'],
      defaultBudget: 10000,
      preferredTransport: 'Public Metro / Bus',
      foodPref: 'Vegetarian',
      ...userData,
      email: userData.email.toLowerCase()
    };
    users.push(newUser);
    writeCollection('users', users);
    return newUser;
  },

  updateUser(id, updateData) {
    const users = readCollection('users');
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    writeCollection('users', users);
    return users[index];
  },

  // TRIPS COLLECTION
  getUserTrips(userId) {
    const trips = readCollection('trips');
    return trips.filter(t => t.userId === userId);
  },

  getTripById(id, userId) {
    const trips = readCollection('trips');
    const trip = trips.find(t => t.id === id);
    if (!trip) return null;
    if (userId && trip.userId !== userId) return null; // Security check
    return trip;
  },

  createTrip(userId, tripPayload) {
    const trips = readCollection('trips');
    const newTrip = {
      id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: tripPayload.status || 'Upcoming',
      ...tripPayload
    };
    trips.unshift(newTrip);
    writeCollection('trips', trips);
    return newTrip;
  },

  updateTrip(id, userId, updateData) {
    const trips = readCollection('trips');
    const index = trips.findIndex(t => t.id === id && t.userId === userId);
    if (index === -1) return null;

    trips[index] = {
      ...trips[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    writeCollection('trips', trips);
    return trips[index];
  },

  deleteTrip(id, userId) {
    const trips = readCollection('trips');
    const filtered = trips.filter(t => !(t.id === id && t.userId === userId));
    if (filtered.length === trips.length) return false;
    writeCollection('trips', filtered);
    return true;
  },

  // SAVED ITEMS COLLECTION
  getUserSavedItems(userId, category = 'All') {
    const saved = readCollection('saved_items');
    let userItems = saved.filter(s => s.userId === userId);
    if (category !== 'All') {
      userItems = userItems.filter(s => (s.itemType || '').toLowerCase() === category.toLowerCase());
    }
    return userItems;
  },

  saveItem(userId, itemPayload) {
    const saved = readCollection('saved_items');
    // Prevent duplicate saves
    const existing = saved.find(s => s.userId === userId && (s.targetId === itemPayload.targetId || s.name === itemPayload.name));
    if (existing) return existing;

    const newItem = {
      id: `saved_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      userId,
      createdAt: new Date().toISOString(),
      ...itemPayload
    };
    saved.unshift(newItem);
    writeCollection('saved_items', saved);
    return newItem;
  },

  deleteSavedItem(id, userId) {
    const saved = readCollection('saved_items');
    const filtered = saved.filter(s => !(s.id === id && s.userId === userId));
    if (filtered.length === saved.length) return false;
    writeCollection('saved_items', filtered);
    return true;
  },

  // RECENTLY VIEWED COLLECTION
  getUserRecentlyViewed(userId, limit = 10) {
    const recent = readCollection('recently_viewed');
    return recent.filter(r => r.userId === userId).slice(0, limit);
  },

  recordRecentlyViewed(userId, itemData) {
    const recent = readCollection('recently_viewed');
    const filtered = recent.filter(r => !(r.userId === userId && r.itemData.name === itemData.name));
    const newItem = {
      id: `rec_${Date.now()}`,
      userId,
      itemData,
      viewedAt: new Date().toISOString()
    };
    filtered.unshift(newItem);
    writeCollection('recently_viewed', filtered.slice(0, 50));
    return newItem;
  }
};
