export interface ProjectTagAddData {
  name: string;
  project_id: string;
  team_id: string;
}

export interface ProjectTagRepository {
  add: ( data: ProjectTagAddData ) => Promise<void>;
}