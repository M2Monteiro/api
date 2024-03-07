import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../repositories/UserRepository";

import UserTypeError from "../utils/error/UserTypeError";
import { User } from "../entities/User";
import { hashPassword } from "../utils/bcrypt/HashPassword";

export class UserService {
  static async register(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const existingEmail = await UserRepository.findByEmail(email);

    if (existingEmail) {
      throw new UserTypeError("E-mail already exists");
    }

    const password_hash = await hashPassword(password);

    const newUser: User = new User();

    // newUser.id = uuidv4();
    newUser.name = name;
    newUser.email = email;
    newUser.password_hash = password_hash;

    return UserRepository.create(newUser);
  }
}
