import { TeamMember } from "src/domain/entities/TeamMember";

export interface TeamMemberDataAdd {
  team_id: string;
  user_id: string;
}

export interface DeleteByIdProps {
  user_id: string;
  team_id: string;
}

export interface TeamMemberRepository {
  add: ( data: TeamMemberDataAdd ) => Promise<TeamMember>;
  deleteById: ( data: DeleteByIdProps ) => Promise<void>;
}