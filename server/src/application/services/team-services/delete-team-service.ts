import { Either, left, right } from "../../../shared/either";
import { TeamRepository } from "../../repositories/team-repository";

export class DeleteTeamService {
  constructor (
    private teamRespository: TeamRepository
  ) {}

  async execute(team_id: string): Promise<Either<Error, void>> {
    if(!team_id)
      return left(new Error("No team id provided"));

    return right(await this.teamRespository.deleteById(team_id));
  }
}