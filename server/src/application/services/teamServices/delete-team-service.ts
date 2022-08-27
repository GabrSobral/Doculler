import { TeamRepository } from "../../../../src/application/repositories/team-repository";

export class DeleteTeamService {
  constructor (
    private teamRespository: TeamRepository
  ) {}

  async execute(team_id: string): Promise<void> {
    if(!team_id)
      throw new Error("No team id provided");

    await this.teamRespository.deleteById(team_id);
  }
}