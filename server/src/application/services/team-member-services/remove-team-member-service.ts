import { TeamRepository } from "../../repositories/team-repository";
import { TeamMemberRepository } from "../../repositories/team-member-repository";
import { left } from "../../../shared/either";

interface RemoveTeamMemberRequest {
  user_id: string;
  team_id: string;
}

export class RemoveTeamMemberService {
  constructor(
    private readonly teamMemberRepository: TeamMemberRepository,
    private readonly teamRepository: TeamRepository,
  ) {}
  
  async execute(request: RemoveTeamMemberRequest) {
    const { user_id, team_id } = request;

    if(!team_id)
      return left(new Error("No team_id provided."));

    if(!user_id)
      return left(new Error("No user_id provided."));

    const team = await this.teamRepository.findById(team_id);

    if(!team)
      return left(new Error("No team was found."));

    await this.teamMemberRepository.deleteById({
      team_id,
      user_id
    });
  }
}