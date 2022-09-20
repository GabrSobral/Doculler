import { TeamRepository } from "../../repositories/team-repository";
import { UserRepository } from "../../repositories/user-repository";
import { TeamMember } from "../../../domain/entities/TeamMember/TeamMember";
import { TeamMemberRepository } from "../../repositories/team-member-repository";
import { Either, left, right } from "../../../shared/either";

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

  async execute(request: CreateTeamMemberRequest): Promise<Either<Error, TeamMember>> {
    const { team_id, user_id } = request;

    if(!team_id)
      return left(new Error("No team_id provided."));

    if(!user_id)
      return left(new Error("No user_id provided."));

    const team = await this.teamRepository.findById(team_id);

    if(!team)
      return left(new Error("No team was found."));

    const user = await this.userRepository.findById(user_id);

    if(!user)
      return left(new Error("No user was found."));

    const newTeamMember = TeamMember.create({
      team_id,
      user_id
    });

    await this.teamMemberRepository.add(newTeamMember);

    return right(newTeamMember);
  }
}