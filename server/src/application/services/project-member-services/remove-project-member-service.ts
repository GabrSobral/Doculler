import { ProjectRepository } from "../../repositories/project-repository";
import { ProjectMemberRepository } from "../../repositories/project-member-repository";
import { TeamRepository } from "../../repositories/team-repository";
import { Either, left, right } from "../../../shared/either";

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

  async execute(request: RemoveProjectMemberServiceProps): Promise<Either<Error, void>>{
    const { team_id, project_id, user_id } = request;

    if(!team_id)
      return left(new Error("No 'team_id' was provided."));

    if(!project_id)
      return left(new Error("No 'project_id' was provided."));

    if(!user_id)
      return left(new Error("No 'user_id' was provided."));
    
    const team = await this.teamRepository.findById(team_id);

    if(!team)
      return left(new Error("No team was found with this 'team_id'"));

    const project = await this.projectRepository.getById(project_id);

    if(!project)
      return left(new Error("No project was found with this 'project_id'"));
      
    return right(await this.projectMemberRepository.delete({
      team_id,
      user_id,
      project_id,
    }))
  }
}