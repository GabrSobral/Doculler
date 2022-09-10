import { TeamRepository } from '../../src/application/repositories/team-repository';
import { Team } from "../../src/domain/entities/Team/Team";

export class InMemoryTeamRepository implements TeamRepository {
  public items: Team[] = []

  async create( data: Team ): Promise<Team> {
    this.items.push(data);

    return data;
  }

  async findById(team_id: string): Promise<Team | null> {
    const team = this.items.find(item => item.id === team_id);

    if(!team)
      return null;

    return team;
  }

  async deleteById(team_id: string): Promise<void> {
    this.items = this.items.filter(item => item.id  !== team_id);
  }
}