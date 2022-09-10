import { ProjectRepository } from '../../src/application/repositories/project-repository';
import { Project } from '../../src/domain/entities/Project/Project'

export class InMemoryProjectRepository implements ProjectRepository {
  public items: Project[] = []

  async create(data: Project): Promise<Project> {
    this.items.push(data);
    
    return data;
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