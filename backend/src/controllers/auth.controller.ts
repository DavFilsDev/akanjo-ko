import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RegisterDto } from "../dto/register.dto";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const registerDto = plainToInstance(RegisterDto, req.body);
      const errors = await validate(registerDto);

      if (errors.length > 0) {
        res.status(400).json({
          message: "Validation failed",
          errors: errors.map((err) => Object.values(err.constraints || {})),
        });
        return;
      }

      const user = await this.authService.register(registerDto);

      const { password, ...userWithoutPassword } = user;

      res.status(201).json({
        message: "User registered successfully",
        user: userWithoutPassword,
      });
    } catch (error: any) {
      if (error.message === "Email already in use") {
        res.status(409).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
}