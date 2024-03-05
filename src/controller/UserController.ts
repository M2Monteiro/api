import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  static async register(request: Request, response: Response) {
    const { name, email, password_hash } = request.body;

    try {
      const newUser = await UserService.register(name, email, password_hash);
      response.status(201).json(newUser);
    } catch (error) {
      response.status(400).json(error);
    }
  }
}
