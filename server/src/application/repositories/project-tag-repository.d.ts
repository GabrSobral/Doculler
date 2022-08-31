import { ProjectTag } from "src/domain/entities/ProjectTag";

export interface ProjectTagAddData {
  name: string;
  project_id: string;
  team_id: string;
}

export interface ProjectTagRepository {
  add: ( data: ProjectTagAddData ) => Promise<ProjectTag>;
  remove: ( tag_id: string) => Promise<void>;
}