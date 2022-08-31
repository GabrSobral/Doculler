import bcrypt from "bcrypt";

import { UserRepository } from "../../repositories/user-repository";
import { User } from "../../../domain/entities/User";
import { JsonWebToken } from "src/adapters/json-web-token/json-web-token-jwt-adapter";

interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
}

type Result = User & { token: string }

export class UserRegisterService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jsonWebTokenHandler: JsonWebToken,
  ) {}

  async execute(request: UserRegisterRequest) : Promise<Result> {
    const {
      email,
      name,
      password
    } = request;

    const alreadyExists = await this.userRepository.findByEmail(email);

    if(alreadyExists)
      throw new Error("Email already registered.");
    
    if(!name)
      throw new Error("User name not provided.");

    if(!password)
      throw new Error("User password not provided.");

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
      name,
      email,
      password: encryptedPassword
    });

    await this.userRepository.register(newUser);

    const token = this.jsonWebTokenHandler.sign({ 
        email: newUser.email 
      }, 60 * 60 // 1 hour
    )

    return { ...newUser, token } as Result;
  }
}