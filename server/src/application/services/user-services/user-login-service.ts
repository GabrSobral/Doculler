import bcrypt from 'bcrypt';
import { JsonWebToken } from 'src/adapters/json-web-token/json-web-token-jwt-adapter';

import { UserRepository } from "src/application/repositories/user-repository";
import { User } from 'src/domain/entities/User';

interface UserLoginRequest {
  email: string;
  password: string;
}

type Result = User & { token: string }

export class UserLoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jsonWebTokenHandler: JsonWebToken,
  ) {}

  async execute(request: UserLoginRequest ): Promise<Result> {
    const { email, password } = request;

    if(!email || !password)
      throw new Error("Email/Password invalid.");
    
    const user = await this.userRepository.findByEmail(email);

    if (!user)
      throw new Error("User not exists");

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if(!isCorrectPassword)
      throw new Error("Email/Password invalid.");

    const token = this.jsonWebTokenHandler.sign({ 
      email: user.email 
    }, 60 * 60 // 1 hour
  )

    return { ...user, token } as Result;
  }
}