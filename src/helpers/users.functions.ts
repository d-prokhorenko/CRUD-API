import { User } from '../interfaces/user.interface.js';

export function isUserValid({ username, age, hobbies }: User): boolean {
  return username?.trim() && (age || age === 0) && Array.isArray(hobbies) ? true : false;
}
