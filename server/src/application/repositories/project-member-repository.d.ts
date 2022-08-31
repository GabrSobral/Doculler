import { ProjectMember } from "src/domain/entities/ProjectMember";

export interface ProjectMemberRemoveProps {
  team_id: string;
  user_id: string;
  project_id: string;
}

export interface ProjectMemberRepository {
  add: ( data: ProjectMember ) => Promise<void>;
  delete: ( data: ProjectMemberRemoveProps ) => Promise<void>;
}