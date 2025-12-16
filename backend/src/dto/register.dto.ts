import { IsEmail, IsString, MinLength, IsOptional, IsIn } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsIn(["user", "admin"], {
    message: "Role must be either 'user' or 'admin'",
  })
  role?: "user" | "admin";
}