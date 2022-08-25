import bcrypt from 'bcrypt';

import { UserRepository } from "src/application/repositories/user-repository";

interface UserLoginRequest {
  email: string;
  password: string;
}

export class UserLoginService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(request: UserLoginRequest ) {
    const { email, password } = request;

    if(!email || !password)
      throw new Error("Email/Password invalid.");
    
    const user = await this.userRepository.findByEmail(email);

    if (!user)
      throw new Error("User not exists");

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if(!isCorrectPassword)
      throw new Error("Email/Password invalid.");

    return user;
  }
}