import bcrypt from "bcrypt";

import { User } from "../../../domain/entities/User/User";
import { UserRepository } from "../../repositories/user-repository";
import { JsonWebToken } from "../../../../src/adapters/json-web-token/json-web-token-jwt-adapter";

import { Either, Left, right } from "../../../../src/shared/either";

interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginResult extends User { token: string }

export class UserRegisterService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jsonWebTokenHandler: JsonWebToken,
  ) {}

  async execute(request: UserRegisterRequest): Promise<Either<Error, UserLoginResult>> {
    const {
      email,
      name,
      password
    } = request;

    const alreadyExists = await this.userRepository.findByEmail(email);

    if(alreadyExists)
      return new Left(new Error("Email already registered."));
    
    if(!name)
      return new Left(new Error("User name not provided."));

    if(!password)
      return new Left(new Error("User password not provided."));

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
      name,
      email,
      password: encryptedPassword
    });

    if(newUser.isLeft())
      return new Left(new Error("Error on try to create user"));

    await this.userRepository.register(newUser.value);

    const token = this.jsonWebTokenHandler.sign({ 
        email: newUser.value.email.value
      }, 60 * 60 // 1 hour
    )

    return right({
      id: newUser.value.id,
      name: newUser.value.name,
      email: newUser.value.email,
      password: newUser.value.password,
      created_at: newUser.value.created_at,
      updated_at: newUser.value.updated_at,
      token: token
    } as UserLoginResult);
  }
}