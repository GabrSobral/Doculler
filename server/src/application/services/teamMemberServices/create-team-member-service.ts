import { TeamRepository } from "../../../../src/application/repositories/team-repository";
import { UserRepository } from "../../../../src/application/repositories/user-repository";
import { TeamMember } from "../../../../src/domain/entities/TeamMember";
import { TeamMemberRepository } from "../../../../src/application/repositories/team-member-repository";

interface CreateTeamMemberRequest {
  team_id: string;
  user_id: string;
}

export class CreateTeamMember {
  constructor(
    private readonly teamMemberRepository: TeamMemberRepository,
    private readonly teamRepository: TeamRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(request: CreateTeamMemberRequest): Promise<TeamMember> {
    const { team_id, user_id } = request;

    if(!team_id)
      throw new Error("No team_id provided.");

    if(!user_id)
      throw new Error("No user_id provided.");

    const team = await this.teamRepository.findById(team_id);

    if(!team)
      throw new Error("No team was found.");

    const user = await this.userRepository.findById(user_id);

    if(!user)
      throw new Error("No user was found.");

    const newTeamMember = TeamMember.create({
      team_id,
      user_id
    });

    await this.teamMemberRepository.add(newTeamMember);

    return newTeamMember;
  }
}