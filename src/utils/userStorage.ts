import { UserProfile, SavedUserPathway } from '../types/career';

const USERS_STORAGE_KEY = 'educareer_users';
const CURRENT_USER_KEY = 'educareer_current_user';

// -------------------------------------------------------------
// Local Storage Cache Helpers (Client-side fast access)
// -------------------------------------------------------------
export function getAllUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY) || localStorage.getItem('disha_users');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to get users from localStorage', e);
    return [];
  }
}

export function saveAllUsers(users: UserProfile[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users to localStorage', e);
  }
}

export function getCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY) || localStorage.getItem('disha_current_user');
    if (!raw) return null;
    const currentUser: UserProfile = JSON.parse(raw);
    const users = getAllUsers();
    const freshUser = users.find((u) => u.id === currentUser.id);
    return freshUser || currentUser;
  } catch (e) {
    console.error('Failed to get current user', e);
    return null;
  }
}

export function setCurrentUser(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      // Also update in allUsers cache
      const users = getAllUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx >= 0) {
        users[idx] = user;
      } else {
        users.push(user);
      }
      saveAllUsers(users);
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error('Failed to set current user', e);
  }
}

export function logoutUser(): void {
  setCurrentUser(null);
}

// -------------------------------------------------------------
// Cross-Device Server-Backed Authentication
// -------------------------------------------------------------

/**
 * Register user across all devices by storing on central server database.
 */
export async function registerUser(
  name: string,
  email: string,
  password?: string,
  initialPathway?: SavedUserPathway | null
): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName) {
    return { success: false, message: 'Please enter your name.' };
  }
  if (!trimmedEmail || !trimmedEmail.includes('@')) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        password: password || '',
        initialPathway: initialPathway || null,
      }),
    });

    const data = await res.json();
    if (res.ok && data.success && data.user) {
      setCurrentUser(data.user);
      return { success: true, user: data.user };
    }

    if (data.message) {
      return { success: false, message: data.message };
    }
  } catch (err) {
    console.warn('Backend server unreachable, falling back to local storage registration:', err);
  }

  // Fallback: Local registration if server is temporarily unreachable
  const users = getAllUsers();
  const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
  if (existing) {
    return { success: false, message: 'An account with this email already exists. Please log in.' };
  }

  const newUser: UserProfile = {
    id: 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    name: trimmedName,
    email: trimmedEmail,
    password: password || '',
    savedPathway: initialPathway || null,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveAllUsers(users);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

/**
 * Log in user across any device (PC, phone, tablet) by checking server database.
 */
export async function loginUser(
  email: string,
  password?: string
): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail) {
    return { success: false, message: 'Please enter your email.' };
  }

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: trimmedEmail,
        password: password || '',
      }),
    });

    const data = await res.json();
    if (res.ok && data.success && data.user) {
      setCurrentUser(data.user);
      return { success: true, user: data.user };
    }

    if (data.message) {
      return { success: false, message: data.message };
    }
  } catch (err) {
    console.warn('Backend server unreachable, checking local storage cache:', err);
  }

  // Fallback: Local search if server offline
  const users = getAllUsers();
  const user = users.find((u) => u.email.toLowerCase() === trimmedEmail);

  if (!user) {
    return {
      success: false,
      message: 'Account not found. Please sign up to create your profile on this or any device.',
    };
  }

  if (user.password && password !== undefined && user.password !== password) {
    return { success: false, message: 'Incorrect password. Please try again.' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

/**
 * Persist updated pathway to server so changes are reflected on all devices.
 */
export async function updateUserPathway(
  userId: string,
  pathway: SavedUserPathway | null
): Promise<UserProfile | null> {
  // Update local cache immediately
  const users = getAllUsers();
  const index = users.findIndex((u) => u.id === userId);
  let updatedUser: UserProfile | null = null;

  if (index !== -1) {
    users[index].savedPathway = pathway;
    saveAllUsers(users);
    updatedUser = users[index];
    const curr = getCurrentUser();
    if (curr && curr.id === userId) {
      setCurrentUser(users[index]);
    }
  }

  try {
    const res = await fetch('/api/auth/update-pathway', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, pathway }),
    });
    const data = await res.json();
    if (res.ok && data.success && data.user) {
      setCurrentUser(data.user);
      return data.user;
    }
  } catch (err) {
    console.warn('Could not sync pathway to server:', err);
  }

  return updatedUser;
}

/**
 * Sync local users to server database on initial load.
 * Bridges any accounts previously created only on the local PC!
 */
export async function syncLocalUsersToServer(): Promise<void> {
  const users = getAllUsers();
  if (users.length === 0) return;

  try {
    await fetch('/api/auth/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users }),
    });
  } catch (e) {
    // Silent fail if backend not reachable yet
  }
}

// Auto-run sync on client load
if (typeof window !== 'undefined') {
  setTimeout(() => {
    syncLocalUsersToServer();
  }, 1000);
}
