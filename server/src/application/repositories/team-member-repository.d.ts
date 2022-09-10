import { TeamMember } from "src/domain/entities/TeamMember";

interface TeamMemberIndentifierProps {
  team_id: string;
  user_id: string;
}

interface TeamMemberRepository {
  add: ( data: TeamMemberIndentifierProps ) => Promise<TeamMember>;
  deleteById: ( data: TeamMemberIndentifierProps ) => Promise<void>;
  getById: ( data: TeamMemberIndentifierProps) => Promise<TeamMember | null>
}