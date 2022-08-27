import { TeamRepository } from "../../../../src/application/repositories/team-repository";
import { TeamMemberRepository } from "../../../../src/application/repositories/team-member-repository";

export interface RemoveTeamMemberRequest {
  user_id: string;
  team_id: string;
}

export class RemoveTeamMemberService {
  constructor(
    private teamMemberRepository: TeamMemberRepository,
    private teamRepository: TeamRepository,
  ) {}
  
  async execute(request: RemoveTeamMemberRequest) {
    const { user_id, team_id } = request;

    if(!team_id)
      throw new Error("No team_id provided.");

    if(!user_id)
      throw new Error("No user_id provided.");

    const team = await this.teamRepository.findById(team_id);

    if(!team)
      throw new Error("No team was found.");

    await this.teamMemberRepository.deleteById({
      team_id,
      user_id
    });
  }
}