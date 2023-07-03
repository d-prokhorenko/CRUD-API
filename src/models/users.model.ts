import { USERS } from '../data/users.js';
import { User } from '../interfaces/user.interface.js';

export async function getUsers(): Promise<User[]> {
  return new Promise((res, rej) => {
    res(USERS);
  });
}

export async function getUserById(userId: string): Promise<User> {
  return new Promise((res, rej) => {
    const user = USERS.find(({ id }) => id === userId);
    if (user) {
      res(user);
    } else {
      rej('User does not exists');
    }
  });
}
