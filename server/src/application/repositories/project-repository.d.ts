import { Project } from "src/domain/entities/Project";

export interface ProjectCreateData {
  name: string;
  description: string;
  team_id: string;
}

export interface ProjectRepository {
  create: ( data: ProjectCreateData ) => Promise<Project>;
  getProjectsFromTeam: ( team_id: string ) => Promise<Project[]>;
}