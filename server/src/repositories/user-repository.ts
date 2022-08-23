import { User } from "@prisma/client";

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRepository {
  register: ( data: UserRegister ) => Promise<User>;
  login: ( data: UserLogin ) => Promise<User>;
  getByEmail: ( user_email: string ) => Promise<null | User>
}