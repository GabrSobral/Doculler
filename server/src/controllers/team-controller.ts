import { Request, Response } from "express";
import { CreateTeamRequest, CreateTeamService } from "src/services/teamService/create-team-service";

export class TeamController {
  private teamRespository = new this.teamRespository();

  async create (request: Request, response: Response) {
    const { 
      name,
      description
    } = request.body as CreateTeamRequest;

    const teamService = new CreateTeamService();

    const newTeam = 
    return response.status(200).send()
  }
}