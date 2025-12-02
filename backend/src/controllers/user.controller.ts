import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAll();
  res.json(users);
};
