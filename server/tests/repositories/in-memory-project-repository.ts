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
  async getProjectsFromTeam(team_id: string): Promise<Project[]> {
    const projects = this.items.filter(item => item.team_id === team_id);

    return projects;
  }

  async getById(project_id: string) {
    const project = this.items.find(item => item.id === project_id);

    return project;
  }
}