import { ProjectRepository } from "src/application/repositories/project-repository";
import { ProjectTagRepository } from "src/application/repositories/project-tag-repository";
import { ProjectTag } from "src/domain/entities/ProjectTag";

export interface CreateProjectTagProps {
  name: string;
  team_id: string;
  project_id: string;
}

export class CreateProjectTagService {
  constructor(
    private readonly projectTagRepository: ProjectTagRepository,
    private readonly projectRepository: ProjectRepository
  ) {}
  
  async execute(request: CreateProjectTagProps): Promise<ProjectTag> {
    const { name, team_id, project_id } = request;

    if(!name)
      throw new Error("No 'name' was provided");

    if(!team_id)
      throw new Error("No 'team_id' was provided");

    if(!project_id)
      throw new Error("No 'project_id' was provided");

    const projectAlreadyExists = await this.projectRepository.getById(project_id);

    if(!projectAlreadyExists)
      throw new Error("Project not exist");

    const newTag = ProjectTag.create({
      name,
      project_id,
      team_id
    });

    await this.projectTagRepository.add(newTag);

    return newTag;
  }
}