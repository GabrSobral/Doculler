import { Team } from "../../../domain/entities/Team/Team";
import { TeamRepository } from "../../repositories/team-repository";
import { Either, right, left } from '../../../shared/either'

interface CreateTeamRequest {
  name: string;
  description: string;
}

export class CreateTeamService {
  constructor (
    private teamRespository: TeamRepository
  ) {}

  async execute(request: CreateTeamRequest): Promise<Either<Error, Team>> {
    const { name, description } = request;

    if(!name)
      return left(new Error("No team name provided"));

    const newTeam = await this.teamRespository.create({
      name,
      description
    });

    return right(newTeam);
  }
}
