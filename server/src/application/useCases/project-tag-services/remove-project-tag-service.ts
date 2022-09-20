import { ProjectRepository } from "../../repositories/project-repository";
import { ProjectTagRepository } from "../../repositories/project-tag-repository";

interface RemoveProjectTagSericeProps {
  project_tag_id: string;
  project_id: string;
}

export class RemoveProjectTagService {
  constructor(
    private projectTagRepository: ProjectTagRepository,
    private projectRepository: ProjectRepository
  ) {}

  async execute(request: RemoveProjectTagSericeProps): Promise<void> {
    const { project_id, project_tag_id} = request;

    if(!project_id)
      throw new Error("No 'project_id' was provided");

    if(!project_tag_id)
      throw new Error("No 'project_tag_id' was provided");

    const projectRealyExists = await this.projectRepository.getById(project_id);

    if(!projectRealyExists)
      throw new Error("No project was found with this 'project_id'");

    await this.projectTagRepository.remove(project_tag_id);
  }
}