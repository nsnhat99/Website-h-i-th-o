import type { User, Registration } from './types';

// Mock database to simulate a real database
const mockDB = {
  users: [
    // FIX: Add `as const` to the `role` property to ensure it's typed as a literal 'admin' or 'user'
    // instead of the general `string` type, aligning it with the `User` type definition.
    { id: 1, username: 'admin', password: 'password', role: 'admin' as const, email: 'admin1@email.com' },
    { id: 2, username: 'user', password: 'password', role: 'user' as const, email: 'user1@email.com' },
  ],
  // FIX: Add mock registration data.
  registrations: [
    { id: 1, name: 'Nguyễn Văn An', organization: 'Đại học Quốc gia', email: 'nva@email.com', phone: '123456789', withPaper: 'yes' },
    { id: 2, name: 'Trần Thị Bình', organization: 'Viện Khoa học Giáo dục', email: 'ttb@email.com', phone: '123456789', withPaper: 'yes' },
    { id: 3, name: 'Lê Văn Cường', organization: 'Đại học Sư phạm', email: 'lvc@email.com', phone: '123456789', withPaper: 'yes' },
    { id: 4, name: 'Some Attendee', organization: 'Some Company', email: 'sa@email.com', phone: '123456789', withPaper: 'no' },
  ] as Registration[],
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

// FIX: Add and export getRegistrations function to resolve import error.
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
