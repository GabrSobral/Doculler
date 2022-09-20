import { Either, left, right } from "../../../shared/either";
import { ProjectRepository } from "../../repositories/project-repository";
import { ProjectTagRepository } from "../../repositories/project-tag-repository";
import { ProjectTag } from "../../../domain/entities/ProjectTag/ProjectTag";

interface CreateProjectTagProps {
  name: string;
  team_id: string;
  project_id: string;
}

export class CreateProjectTagService {
  constructor(
    private readonly projectTagRepository: ProjectTagRepository,
    private readonly projectRepository: ProjectRepository
  ) {}
  
  async execute(request: CreateProjectTagProps): Promise<Either<Error,  ProjectTag>> {
    const { name, team_id, project_id } = request;

    if(!name)
      return left(new Error("No 'name' was provided"));

    if(!team_id)
      return left(new Error("No 'team_id' was provided"));

    if(!project_id)
      return left(new Error("No 'project_id' was provided"));

    const projectAlreadyExists = await this.projectRepository.getById(project_id);

    if(!projectAlreadyExists)
      return left(new Error("Project not exist"));

    const newTag = ProjectTag.create({
      name,
      project_id,
      team_id
    });

    if(newTag.isLeft())
      return left(newTag.value);

    await this.projectTagRepository.add(newTag.value);

    return right(newTag.value);
  }
}