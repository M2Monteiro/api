import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import { UserDTO } from "./../dtos/UserDTO";
import { UserService } from "../services/UserService";
import UserTypeError from "../utils/error/UserTypeError";

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  public async register(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {
      const userDTO: UserDTO = {
        name,
        email,
        password,
      };

      const newUser = await this.userService.register(userDTO);
      return response.status(201).json(newUser);
    } catch (error) {
      if (error instanceof UserTypeError) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async login(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const userDTO: UserDTO = {
        email,
        password,
      };

      const accessToken = await this.userService.login(userDTO);

      return response.status(200).json({ token: accessToken });
    } catch (error) {
      return response.status(401).send("E-mail or Password is invalid");
    }
  }
}
