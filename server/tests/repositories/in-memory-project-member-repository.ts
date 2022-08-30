import { ProjectMember } from '../../src/domain/entities/ProjectMember'

export class InMemoryProjectMemberRepository {
  public items: ProjectMember[] = []

  async add(projectMember: ProjectMember): Promise<void> {
    this.items.push(projectMember);
  }
}