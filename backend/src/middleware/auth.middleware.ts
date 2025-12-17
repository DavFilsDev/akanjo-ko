import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export interface AuthRequest extends Request {
  user?: User;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Access token required" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret not configured");
    }

    const payload = jwt.verify(token, secret) as {
      id: number;
      email: string;
      role: "user" | "admin";
    };

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: payload.id });

    if (!user) {
      res.status(401).json({ message: "Invalid token - user not found" });
      return;
    }

    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword as User;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};