import { Team } from "src/domain/entities/Team";

export interface TeamCreateData {
  name: string;
  description: string;
}

export interface TeamRepository {
  create: ( data: TeamCreateData ) => Promise<Team>;
  findById: (team_id: string) => Promise<Team | null>;
  deleteById: ( team_id: string ) => Promise<void>;
}