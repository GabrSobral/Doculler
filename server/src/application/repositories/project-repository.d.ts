import { Project } from "src/domain/entities/Project";

interface ProjectRepository {
  create: ( data: Project ) => Promise<Project>;
  getProjectsFromTeam: ( team_id: string ) => Promise<Project[]>;
  getById: ( project_id: string) => Project<Project | null>
}