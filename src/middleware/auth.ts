import { config } from "../../config";

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers["authentication"] as string;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return response.status(401);
  }

  jwt.verify(token, config.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      return response.status(403);
    }
    request.user = user;
    next();
  });
};
