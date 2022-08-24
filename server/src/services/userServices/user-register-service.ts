import bcrypt from "bcrypt";

import { UserRepository } from "src/repositories/user-repository";

interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export class UserRegisterService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(request: UserRegisterRequest) : Promise<any> {
    const {
      email,
      name,
      password
    } = request;

    const alreadyExists = await this.userRepository.getByEmail(email);

    if(alreadyExists)
      throw new Error("Email already registered.");
    
    if(!name)
      throw new Error("User name not provided.");

    if(!password)
      throw new Error("User password not provided.");

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.register({
      email,
      name,
      password: encryptedPassword
    });

    return newUser;
  }
}