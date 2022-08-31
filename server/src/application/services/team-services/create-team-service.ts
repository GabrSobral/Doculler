import { TeamRepository } from "../../repositories/team-repository";

export interface CreateTeamRequest {
  name: string;
  description: string;
}

export class CreateTeamService {
  constructor (
    private teamRespository: TeamRepository
  ) {}

  async execute(request: CreateTeamRequest) {
    const { name, description } = request;

    if(!name)
      throw new Error("No team name provided");

    const newTeam = await this.teamRespository.create({
      name,
      description
    });

    return newTeam;
  }
}