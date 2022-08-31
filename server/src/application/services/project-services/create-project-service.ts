import { Project } from "../../../domain/entities/Project";
import { ProjectRepository } from "../../repositories/project-repository";
import { TeamRepository } from "../../repositories/team-repository";

export interface CreateProjectRequest {
  name: string;
  description?: string;
  team_id: string;
}

export class CreateProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly teamRepository: TeamRepository
  ) {}

  async execute(request: CreateProjectRequest): Promise<Project> {
    const { name, description, team_id } = request;

    if(!name)
      throw new Error("No name provided.");

    if(!team_id)
      throw new Error("No team ID provided.");

    const team = await this.teamRepository.findById(team_id);

    if(!team)
      throw new Error("No team was found with this ID");

    const project = Project.create({
      name,
      description: description || "",
      team_id
    });

    await this.projectRepository.create(project);

    return project;
  }
}