import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";

import UserTypeError from "../utils/error/UserTypeError";
import { hashCompare, hashPassword } from "../utils/bcrypt/HashPassword";
import { UserDTO } from "../dtos/UserDTO";
import { config } from "../../config";
import { User } from "../entities/User";

export class UserService {
  static async register(userDto: UserDTO): Promise<User> {
    const existingEmail = await UserRepository.findByEmail(userDto.email);

    if (existingEmail) {
      throw new UserTypeError("E-mail already exists");
    }

    const password_hash = await hashPassword(userDto.password);

    const user: UserDTO = {
      ...userDto,
      password: password_hash,
    };

    return UserRepository.create(user);
  }

  static async login(userDto: UserDTO): Promise<string> {
    const user = await UserRepository.findUserByEmail(userDto.email);

    if (!user) {
      throw new UserTypeError("User not exist");
    }
    
    if (!(await hashCompare(userDto.password, user[0].password_hash!))) {
      throw new UserTypeError("E-mail or Password is invalid");
    }

    const accessToken = jwt.sign(
      JSON.parse(JSON.stringify(user[0])),
      config.JWT_SECRET as string
    );

    return accessToken;
  }
}
