import { Team } from "@prisma/client";

export interface TeamCreateData {
  name: string;
  description: string;
}

export interface TeamRepository {
  create: ( data: TeamCreateData ) => Promise<Team>;
  getMyTeams: ( member_id: string ) => Promise<Team[]>;
}