import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import UserTypeError from "../utils/error/UserTypeError";

export class UserController {
  static async register(request: Request, response: Response) {
    const { name, email, password_hash } = request.body;

    try {
      const newUser = await UserService.register(name, email, password_hash);
      return response.status(201).json(newUser);
    } catch (error) {
      if (error instanceof UserTypeError) {
        return response.status(400).json({ error: error.message });
      }
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
