import { User } from "../models/User";

let users: User[] = [];

export class UserRepository {
  static async findByEmail(email: string): Promise<User | undefined> {
    return users.find((user) => user.email === email);
  }

  static async create(user: User): Promise<User> {
    const newUser = user;
    users.push(newUser);
    return newUser;
  }
}
