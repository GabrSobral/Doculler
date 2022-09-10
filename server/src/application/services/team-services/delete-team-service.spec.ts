import { Team } from "../../../domain/entities/Team/Team";
import { InMemoryTeamRepository } from "../../../../tests/repositories/in-memory-team-repository"
import { DeleteTeamService } from "./delete-team-service";

describe("delete-team-service", () => {
  it("should be able to delete a team", async () => {
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    
    const team = Team.create({
      name: "Test Team",
      description: "Lorem Ipsum Dolot Sit Amet",
    });

    if(team.isLeft())
      return;

    inMemoryTeamRepository.items.push(team.value);

    expect(inMemoryTeamRepository.items.length).toBeGreaterThan(0);

    const deleteTeamService = new DeleteTeamService(inMemoryTeamRepository);

    await deleteTeamService.execute(team.value.id);

    expect(inMemoryTeamRepository.items.length).toEqual(0);
  })

  it("should not be able to delete a team without team_id passed by params", async () => {
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    
    const team = Team.create({
      name: "Test Team",
      description: "Lorem Ipsum Dolot Sit Amet",
    });

    if(team.isLeft())
      return;

    inMemoryTeamRepository.items.push(team.value);

    expect(inMemoryTeamRepository.items.length).toBeGreaterThan(0);

    const deleteTeamService = new DeleteTeamService(inMemoryTeamRepository);

    const resultOrError = await deleteTeamService.execute("");
    
    expect(resultOrError.isLeft()).toBe(true);
  })
  
})