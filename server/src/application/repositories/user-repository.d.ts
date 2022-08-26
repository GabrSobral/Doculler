import { User } from "src/domain/entities/User";

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface UserRepository {
  register: ( data: UserRegister ) => Promise<User>;
  findByEmail: ( user_email: string ) => Promise<User | null>
}