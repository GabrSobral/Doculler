import { User } from "../../../src/domain/entities/User";
import { Email } from "../../../src/domain/entities/User/email.value-object";
import { Name } from "../../../src/domain/entities/User/name.value-object";

interface UserRepository {
  register: ( data: User ) => Promise<User>;
  findByEmail: ( user_email: string ) => Promise<User | null>;
  findById: (team_id: string) => Promise<User | null>;
}