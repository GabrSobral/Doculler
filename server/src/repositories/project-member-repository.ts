interface ProjectMemberAddData {
  project_id: string;
  team_id: string;
  member_id: string;
}

export interface ProjectMemberRepository {
  add: ( data: ProjectMemberAddData ) => Promise<void>;
}