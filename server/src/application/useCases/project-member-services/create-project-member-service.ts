import { ProjectRepository } from "../../repositories/project-repository";
import { ProjectMemberRepository } from "../../repositories/project-member-repository";
import { TeamMemberRepository } from "../../repositories/team-member-repository";
import { ProjectMember } from "../../../domain/entities/ProjectMember/ProjectMember";
import { left, right } from "../../../shared/either";

interface CreateProjectMemberServiceProps {
  project_id: string;
  user_id: string;
  team_id: string;
}

export class CreateProjectMemberService {
  constructor(
    private projectRepository: ProjectRepository,
    private projectMemberRepository: ProjectMemberRepository,
    private teamMemberRepository: TeamMemberRepository,
  ) {}
  
  async execute(request: CreateProjectMemberServiceProps) {
    const { project_id, team_id, user_id } = request;

    if(!project_id)
      return left(new Error("No 'project_id' was provided."));

    if(!team_id)
      return left(new Error("No 'team_id' was provided."));

    if(!user_id)
      return left(new Error("No 'user_id' was provided."));

    const project = await this.projectRepository.getById(project_id);

    if(!project)
      return left(new Error("No project was found with this 'project_id'."));
      
    if(team_id !== project.team_id)
      return left(new Error("Invalid 'team_id'."));

    const teamMember = await this.teamMemberRepository.getById({
      team_id: team_id,
      user_id: user_id
    });

    if(!teamMember)
      return left(new Error("User do not belongs this team."));

    const projectMember = ProjectMember.create({
      team_id,
      project_id,
      user_id
    });

    await this.projectMemberRepository.add(projectMember);

    return right(projectMember);
  }
}