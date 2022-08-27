import { UserRegister } from 'src/application/repositories/user-repository';
import { User } from '../../src/domain/entities/User'

export class InMemoryUserRepository {
  public items: User[] = []

  async findByEmail(user_email: string ): Promise<User | null> {
    const user = this.items.find(user => user.email === user_email);

    if(!user)
      return null;

    return user;
  }

  async register( data: UserRegister ): Promise<User> {
    const newUser = User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    this.items.push(newUser);

    return newUser;
  }

  async findById(user_id: string): Promise<User | null> {
    const user = this.items.find(item => item.id === user_id);

    if(!user)
      return null;

    return user;
  }
}