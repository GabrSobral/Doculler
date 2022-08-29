import { TeamMember } from "src/domain/entities/TeamMember";

export interface TeamMemberIndentifierProps {
  team_id: string;
  user_id: string;
}

export interface TeamMemberRepository {
  add: ( data: TeamMemberIndentifierProps ) => Promise<TeamMember>;
  deleteById: ( data: TeamMemberIndentifierProps ) => Promise<void>;
  getById: ( data: TeamMemberIndentifierProps) => Promise<TeamMember | null>
}