import bcrypt from 'bcrypt';
import { JsonWebToken } from '../../../adapters/json-web-token/json-web-token-jwt-adapter';

import { UserRepository } from "../../../application/repositories/user-repository";
import { Either, left, right } from '../../../shared/either';
import { UserLoginResult } from './user-register-service';

interface UserLoginRequest {
  email: string;
  password: string;
}

export class UserLoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jsonWebTokenHandler: JsonWebToken,
  ) {}

  async execute(request: UserLoginRequest ): Promise<Either<Error, UserLoginResult>> {
    const { email, password } = request;

    if(!email || !password)
      return left(new Error("Email/Password invalid."));
    
    const user = await this.userRepository.findByEmail(email);

    if (!user)
      return left(new Error("User not exists"));

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if(!isCorrectPassword)
      return left(new Error("Email/Password invalid."));

    const token = this.jsonWebTokenHandler.sign({ 
      email: user.email 
    }, 60 * 60 // 1 hour
    );

    return right({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
      token: token
    } as UserLoginResult);
  }
}