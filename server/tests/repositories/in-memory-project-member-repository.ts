import { ProjectMemberRepository } from '../../src/application/repositories/project-member-repository';
import { ProjectMember } from '../../src/domain/entities/ProjectMember/ProjectMember'

export class InMemoryProjectMemberRepository implements ProjectMemberRepository{
  public items: ProjectMember[] = []

  async add(projectMember: ProjectMember): Promise<void> {
    this.items.push(projectMember);
  }

  async delete(data: ProjectMember) {
    const { project_id, team_id, user_id } = data;

    this.items = this.items.filter(item => (item.project_id !== project_id && item.team_id !== team_id && item.user_id !== user_id))
  }
}