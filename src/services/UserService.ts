import jwt from "jsonwebtoken";
import { config } from "@config/index";
import { inject, injectable } from "inversify";

import { UserRepository } from "@repositories/UserRepository";
import { hashCompare, hashPassword } from "@utils/bcrypt/HashPassword";
import { UserDTO } from "@dtos/UserDTO";
import { User } from "@entities/User";
import UserTypeError from "@utils/error/UserTypeError";

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  public async register(userDto: UserDTO): Promise<User> {
    const existingEmail = await this.userRepository.findByEmail(userDto.email);

    if (existingEmail) {
      throw new UserTypeError("E-mail already exists");
    }

    const password_hash = await hashPassword(userDto.password);

    const user: UserDTO = {
      ...userDto,
      password: password_hash,
    };

    return this.userRepository.create(user);
  }

  public async login(userDto: UserDTO): Promise<string> {
    const user = await this.userRepository.findUserByEmail(userDto.email);

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
