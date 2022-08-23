export interface TeamMemberDataAdd {
  team_id: string;
  user_id: string;
}

export interface TeamMemberRepository {
  add: ( data: TeamMemberDataAdd ) => Promise<void>;
}