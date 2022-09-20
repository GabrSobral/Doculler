import { Either, left, right } from "../../../shared/either";
import { Project } from "../../../domain/entities/Project/Project";
import { ProjectRepository } from "../../repositories/project-repository";
import { TeamRepository } from "../../repositories/team-repository";

interface CreateProjectRequest {
  name: string;
  description?: string;
  team_id: string;
}

export class CreateProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly teamRepository: TeamRepository
  ) {}

  async execute(request: CreateProjectRequest): Promise<Either<Error, Project>> {
    const { name, description, team_id } = request;

    if(!team_id)
      return left(new Error("No team ID provided."));

    const team = await this.teamRepository.findById(team_id);

    if(!team)
      return left(new Error("No team was found with this ID"));

    const project = Project.create({
      name,
      description: description || "",
      team_id
    });

    if(project.isLeft())
      return left(new Error("Error on try to create the project instance"));

    await this.projectRepository.create(project.value);

    return right(project.value);
  }
}