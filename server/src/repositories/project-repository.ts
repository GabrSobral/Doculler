export interface ProjectCreateData {
  name: string;
  description: string;
}

export interface ProjectGetProjectsFromTeam {
  team_id: string;
  member_id: string;
}

export interface ProjectRepository {
  create: ( data: ProjectCreateData ) => Promise<void>;
  getProjectsFromTeam: ( data: ProjectGetProjectsFromTeam ) => Promise<void>;
}