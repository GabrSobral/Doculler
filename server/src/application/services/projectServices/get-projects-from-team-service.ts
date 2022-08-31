import { Project } from "../../../../src/domain/entities/Project";

import { ProjectRepository } from "../../../../src/application/repositories/project-repository";
import { TeamMemberRepository } from "../../../../src/application/repositories/team-member-repository";

export interface GetProjectsFromTeamRequest {
  team_id: string;
  user_id: string;
}

export class GetProjectsFromTeam {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly teamMemberRepository: TeamMemberRepository
  ) {}

  async execute(request: GetProjectsFromTeamRequest): Promise<Project[]> {
    const { user_id, team_id } = request;

    if(!team_id)
      throw new Error("No team ID was provided.");

    if(!user_id)
      throw new Error("No team member ID was provided.");

    const teamMember = await this.teamMemberRepository.getById({
      team_id,
      user_id: user_id
    });

    if(!teamMember)
      throw new Error("You do not belong to this team or this team does not exist.");

    const projectsFromTeam = await this.projectRepository.getProjectsFromTeam(team_id);

    return projectsFromTeam;
  }
}