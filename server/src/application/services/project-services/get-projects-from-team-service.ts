import { Either, left, right } from "../../../shared/either";
import { Project } from "../../../domain/entities/Project/Project";

import { ProjectRepository } from "../../repositories/project-repository";
import { TeamMemberRepository } from "../../repositories/team-member-repository";

interface GetProjectsFromTeamRequest {
  team_id: string;
  user_id: string;
}

export class GetProjectsFromTeam {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly teamMemberRepository: TeamMemberRepository
  ) {}

  async execute(request: GetProjectsFromTeamRequest): Promise<Either<Error, Project[]>> {
    const { user_id, team_id } = request;

    if(!team_id)
      return left(new Error("No team ID was provided."));

    if(!user_id)
      return left(new Error("No team member ID was provided."));

    const teamMember = await this.teamMemberRepository.getById({
      team_id,
      user_id: user_id
    });

    if(!teamMember)
      return left(new Error("You do not belong to this team or this team does not exist."));

    const projectsFromTeam = await this.projectRepository.getProjectsFromTeam(team_id);

    return right(projectsFromTeam);
  }
}