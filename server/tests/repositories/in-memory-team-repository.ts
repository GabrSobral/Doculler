import { TeamCreateData } from '../../src/application/repositories/team-repository';
import { Team } from "../../src/domain/entities/Team";

export class InMemoryTeamRepository {
  public items: Team[] = []

  async create( data: TeamCreateData ): Promise<Team> {
    const newTeam = Team.create({
      name: data.name,
      description: data.description
    });

    this.items.push(newTeam);

    return newTeam;
  }

  async findById(team_id: string): Promise<Team | null> {
    const team = this.items.find(item => item.id === team_id);

    if(!team)
      return null;

    return team;
  }

}