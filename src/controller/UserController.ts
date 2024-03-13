import { UserDTO } from "./../dtos/UserDTO";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import UserTypeError from "../utils/error/UserTypeError";

export class UserController {
  static async register(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {
      const userDTO: UserDTO = {
        name,
        email,
        password,
      };

      const newUser = await UserService.register(userDTO);
      return response.status(201).json(newUser);
    } catch (error) {
      if (error instanceof UserTypeError) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async login(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const userDTO: UserDTO = {
        email,
        password,
      };

      const accessToken = await UserService.login(userDTO);

      return response.status(200).json({ token: accessToken });
    } catch (error) {
      return response.status(401).send("E-mail or Password is invalid");
    }
  }
}
