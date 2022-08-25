import { User } from '../../src/domain/entities/User'

export class InMemoryUserRepository {
  public items: User[] = []

  async findByEmail(user_email: string ): Promise<User | null> {
    if(!user_email)
      throw new Error("No email provided");

    const user = this.items.find(user => user.email === user_email);

    if(!user)
      return null;

    return user;
  }
}