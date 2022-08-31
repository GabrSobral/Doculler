import { InMemoryTeamRepository } from '../../../../tests/repositories/in-memory-team-repository';
import { CreateTeamService } from './create-team-service';

describe("create-team-service", () => {
  it("should be able to create a new team", async () => {
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    const createTeamService = new CreateTeamService(inMemoryTeamRepository);

    const newTeam = await createTeamService.execute({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    expect(newTeam).toBeTruthy();
  });

  it("should not be able to create a new team without name", async () => {
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    const createTeamService = new CreateTeamService(inMemoryTeamRepository);

    await expect(createTeamService.execute({
      name: "",
      description: "Lorem Ipsum Dolor Sit Amet"
    })).rejects.toThrow();
  });
})