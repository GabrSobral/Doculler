import { ProjectMember } from "src/domain/entities/ProjectMember";

interface ProjectMemberAddData {
  project_id: string;
  team_id: string;
  member_id: string;
}

export interface ProjectMemberRepository {
  add: ( data: ProjectMemberAddData ) => Promise<ProjectMember>;
}