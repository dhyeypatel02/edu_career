import { UserProfile, SavedUserPathway } from '../types/career';

const USERS_STORAGE_KEY = 'educareer_users';
const CURRENT_USER_KEY = 'educareer_current_user';

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
    // Keep in sync with latest stored profile
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
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error('Failed to set current user', e);
  }
}

export function registerUser(
  name: string,
  email: string,
  password?: string,
  initialPathway?: SavedUserPathway | null
): { success: boolean; user?: UserProfile; message?: string } {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName) {
    return { success: false, message: 'Please enter your name.' };
  }
  if (!trimmedEmail || !trimmedEmail.includes('@')) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

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

export function loginUser(
  email: string,
  password?: string
): { success: boolean; user?: UserProfile; message?: string } {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail) {
    return { success: false, message: 'Please enter your email.' };
  }

  const users = getAllUsers();
  const user = users.find((u) => u.email.toLowerCase() === trimmedEmail);

  if (!user) {
    return { success: false, message: 'Account not found. Please sign up to create your profile.' };
  }

  if (user.password && password !== undefined && user.password !== password) {
    return { success: false, message: 'Incorrect password. Please try again.' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

export function logoutUser(): void {
  setCurrentUser(null);
}

export function updateUserPathway(
  userId: string,
  pathway: SavedUserPathway | null
): UserProfile | null {
  const users = getAllUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return null;

  users[index].savedPathway = pathway;
  saveAllUsers(users);

  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(users[index]);
  }

  return users[index];
}
