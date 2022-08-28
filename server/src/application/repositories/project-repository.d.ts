import { Project } from "src/domain/entities/Project";

export interface ProjectCreateData {
  name: string;
  description: string;
  team_id: string;
}

export interface ProjectGetProjectsFromTeam {
  team_id: string;
  member_id: string;
}

export interface ProjectRepository {
  create: ( data: ProjectCreateData ) => Promise<Project>;
  getProjectsFromTeam: ( data: ProjectGetProjectsFromTeam ) => Promise<Project[]>;
}