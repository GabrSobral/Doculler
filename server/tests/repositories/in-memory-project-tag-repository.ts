import { ProjectTagRepository } from '../../src/application/repositories/project-tag-repository';
import { ProjectTag } from '../../src/domain/entities/ProjectTag/ProjectTag'

export class InMemoryProjectTagRepository implements ProjectTagRepository{
  public items: ProjectTag[] = []

  async add (data: ProjectTag): Promise<ProjectTag> {
    this.items.push(data);
    return data;
  }

  async remove(tag_id: string): Promise<void> {
    this.items = this.items.filter(item => item.id !== tag_id);
  };
}