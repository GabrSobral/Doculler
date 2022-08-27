import { Team } from "../../../../src/domain/entities/Team";
import { InMemoryTeamRepository } from "../../../../tests/repositories/in-memory-team-repository"
import { DeleteTeamService } from "./delete-team-service";

describe("delete-team-service", () => {
  it("should be able to delete a team", async () => {
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    
    const team = Team.create({
      name: "Test Team",
      description: "Lorem Ipsum Dolot Sit Amet",
    })

    inMemoryTeamRepository.items.push(team);

    expect(inMemoryTeamRepository.items.length).toBeGreaterThan(0);

    const deleteTeamService = new DeleteTeamService(inMemoryTeamRepository);

    await deleteTeamService.execute(team.id);

    expect(inMemoryTeamRepository.items.length).toEqual(0);
  })

  it("should not be able to delete a team without team_id passed by params", async () => {
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    
    const team = Team.create({
      name: "Test Team",
      description: "Lorem Ipsum Dolot Sit Amet",
    })

    inMemoryTeamRepository.items.push(team);

    expect(inMemoryTeamRepository.items.length).toBeGreaterThan(0);

    const deleteTeamService = new DeleteTeamService(inMemoryTeamRepository);
    
    await expect(deleteTeamService.execute(""))
      .rejects
      .toThrow();
  })
})