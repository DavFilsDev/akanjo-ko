import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Repository } from "typeorm";
import { RegisterDto } from "../dto/register.dto";
import bcrypt from "bcrypt";

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { name, email, password, role } = registerDto;

    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    return await this.userRepository.save(user);
  }
}