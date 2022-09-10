import { InvalidEmailError } from 'src/domain/errors/user-errors/invalid-email-error';
import { InvalidNameError } from 'src/domain/errors/user-errors/invalid-name-error';
import { Either } from 'src/shared/either';
import { UserRepository } from '../../src/application/repositories/user-repository';
import { User } from '../../src/domain/entities/User/User'

export class InMemoryUserRepository implements UserRepository{
  public items: User[] = []

  async findByEmail(user_email: string ): Promise<User | null> {
    const user = this.items.find(user => user.email.value === user_email);

    if(!user)
      return null;

    return user;
  }

  async register( data: User ): Promise<User> {
    this.items.push(data);

    return data;
  }

  async findById(user_id: string): Promise<User | null> {
    const user = this.items.find(item => item.id === user_id);

    if(!user)
      return null;

    return user;
  }
}