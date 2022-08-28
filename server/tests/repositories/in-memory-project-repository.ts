import { ProjectCreateData } from '../../src/application/repositories/project-repository';
import { Project } from '../../src/domain/entities/Project'

export class InMemoryProjectRepository {
  public items: Project[] = []

  async create(data: ProjectCreateData): Promise<Project> {
    const { description, name, team_id } = data;

    const project = Project.create({
      name,
      description,
      team_id
    });

    return project;
  }
  async getProjectsFromTeam(): Promise<Project[]> {

    return [];
  }
}