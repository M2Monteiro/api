import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";
import UserTypeError from "../utils/error/UserTypeError";

export class UserService {
  static async register(
    name: string,
    email: string,
    password_hash: string
  ): Promise<User> {
    const existingEmail = await UserRepository.findByEmail(email);

    if (existingEmail) {
      throw new UserTypeError("E-mail already exists");
    }

    const newUser: User = { id: uuidv4(), name, email, password_hash };
    return UserRepository.create(newUser);
  }
}
