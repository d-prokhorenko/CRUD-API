import { v4 as uuidv4 } from 'uuid';
import { USERS } from '../data/users.js';
import { User } from '../interfaces/user.interface.js';

export async function getUsers(): Promise<User[]> {
  return new Promise((res) => {
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

export async function createUser(user: User): Promise<User> {
  return new Promise((res) => {
    const newUser = { ...user, id: uuidv4() };
    USERS.push(newUser);
    res(newUser);
  });
}

export async function updateUser(user: User): Promise<User> {
  return new Promise((res, rej) => {
    const currentUserIndex = USERS.findIndex(({ id }) => id === user.id);
    if (currentUserIndex) {
      const updatedUser = { ...USERS[currentUserIndex], ...user };
      USERS.splice(currentUserIndex, 1, { ...updatedUser });
      res(updatedUser);
    } else {
      rej('User does not exists');
    }
  });
}
