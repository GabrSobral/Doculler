import { ProjectTagAddData, ProjectTagRepository } from '../../src/application/repositories/project-tag-repository';
import { ProjectTag } from '../../src/domain/entities/ProjectTag'

export class InMemoryProjectTagRepository implements ProjectTagRepository{
  public items: ProjectTag[] = []

  async add (data: ProjectTagAddData): Promise<ProjectTag> {
    const newTag = ProjectTag.create(data);

    this.items.push(newTag);
    return newTag;
  }

  async remove(tag_id: string): Promise<void> {
    this.items = this.items.filter(item => item.id !== tag_id);
  };
}