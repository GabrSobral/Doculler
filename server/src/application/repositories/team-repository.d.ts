import { Team } from "src/domain/entities/Team";

interface TeamRepository {
  create: ( data: Team ) => Promise<Team>;
  findById: (team_id: string) => Promise<Team | null>;
  deleteById: ( team_id: string ) => Promise<void>;
}