import { ProjectRepository } from "../../repositories/project-repository";
import { ProjectMemberRepository } from "../../repositories/project-member-repository";
import { TeamRepository } from "../../repositories/team-repository";
import { ProjectMember } from "src/domain/entities/ProjectMember";

interface RemoveProjectMemberServiceProps {
  team_id: string;
  project_id: string;
  user_id: string;
}

export class RemoveProjectMemberService {
  constructor(
    private teamRepository: TeamRepository,
    private projectRepository: ProjectRepository,
    private projectMemberRepository: ProjectMemberRepository
  ) {}

  async execute(request: RemoveProjectMemberServiceProps) {
    const { team_id, project_id, user_id } = request;

    if(!team_id)
      throw new Error("No 'team_id' was provided.");

    if(!project_id)
      throw new Error("No 'project_id' was provided.");

    if(!user_id)
      throw new Error("No 'user_id' was provided.");
    
    const team = await this.teamRepository.findById(team_id);

    if(!team)
      throw new Error("No team was found with this 'team_id'");

    const project = await this.projectRepository.getById(project_id);

    if(!project)
      throw new Error("No project was found with this 'project_id'");

    await this.projectMemberRepository.delete({
      team_id,
      user_id,
      project_id,
    });
  }
}