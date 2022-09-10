import { ProjectTag } from "src/domain/entities/ProjectTag";

interface ProjectTagRepository {
  add: ( data: ProjectTag ) => Promise<ProjectTag>;
  remove: ( tag_id: string) => Promise<void>;
}