import type { AdminStats, User, Registration } from './types';

// Mock database to simulate a real database
const mockDB = {
  users: [
    // FIX: Add `as const` to the `role` property to ensure it's typed as a literal 'admin' or 'user'
    // instead of the general `string` type, aligning it with the `User` type definition.
    { id: 1, username: 'admin', password: 'password', role: 'admin' as const, email: 'admin1@email.com' },
    { id: 2, username: 'user', password: 'password', role: 'user' as const, email: 'user1@email.com' },
  ],
  registrations: [] as Registration[],
  stats: {
    totalRegistrations: 123,
    paidAttendees: 89,
    papersSubmitted: 45,
  }
};

// Simulate API latency to mimic real network conditions
const API_LATENCY = 1000;

/**
 * Simulates user login by checking credentials against the mock database.
 * @param username - The username.
 * @param password - The password.
 * @returns A promise that resolves with the user object or rejects if credentials are invalid.
 */
export const login = (username: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockDB.users.find(u => u.username === username && u.password === password);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, API_LATENCY / 2);
  });
};


/**
 * Simulates registering a user by saving their data to a mock database.
 * @param userData - The user's registration data.
 * @returns A promise that resolves on successful registration or rejects on error.
 */
export const registerUser = (userData: Registration): Promise<{ success: boolean; message: string; }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic validation
      if (!userData.email) {
        return reject(new Error('Email is required.'));
      }
      mockDB.registrations.push(userData);
      mockDB.stats.totalRegistrations++;
      if (userData.withPaper === 'yes') {
        mockDB.stats.papersSubmitted++;
      }
      console.log('Mock DB Registrations:', mockDB.registrations);
      resolve({ success: true, message: 'Registration successful!' });
    }, API_LATENCY);
  });
};

/**
 * Simulates fetching admin statistics from the backend.
 * @returns A promise that resolves with the admin statistics.
 */
export const getAdminStats = (): Promise<AdminStats> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockDB.stats);
        }, API_LATENCY / 2);
    });
};

/**
 * Retrieves a list of all users from the mock database, excluding their passwords.
 * @returns A promise that resolves with an array of user objects.
 */
export const getUsers = (): Promise<User[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const usersWithoutPasswords = mockDB.users.map(({ password, ...user }) => user);
            resolve(usersWithoutPasswords);
        }, API_LATENCY / 4);
    });
};

/**
 * Retrieves a list of all registrations from the mock database.
 * @returns A promise that resolves with an array of registration objects.
 */
export const getRegistrations = (): Promise<Registration[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockDB.registrations);
        }, API_LATENCY / 4);
    });
};
