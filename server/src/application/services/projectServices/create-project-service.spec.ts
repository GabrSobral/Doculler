import { InMemoryTeamRepository } from '../../../../tests/repositories/in-memory-team-repository';
import { Project } from '../../../../src/domain/entities/Project';
import { Team } from '../../../../src/domain/entities/Team';
import { InMemoryProjectRepository } from '../../../../tests/repositories/in-memory-project-repository';
import { CreateProjectService } from './create-project-service';

describe("create-project-service", () => {
  it("should be able to create a project", async () => {
    const inMemoryProjectRepository = new InMemoryProjectRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    
    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    const project = Project.create({
      name: "Project Test",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: team.id,
    });

    inMemoryTeamRepository.items.push(team);

    const createProjectService = new CreateProjectService(
      inMemoryProjectRepository,
      inMemoryTeamRepository
    );

    await expect(createProjectService.execute(project))
      .resolves.not.toThrow();
  });

  it("should not be able to create a team without team_it passed by props", async () => {
    const inMemoryProjectRepository = new InMemoryProjectRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();

    const project = Project.create({
      name: "Project Test",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: "",
    });

    inMemoryProjectRepository.items.push(project);

    const createProjectService = new CreateProjectService(
      inMemoryProjectRepository,
      inMemoryTeamRepository
    );

    await expect(createProjectService.execute(project))
      .rejects.toThrow();
  });

  it("should not be able to create a team without 'name' passed by props", async () => {
    const inMemoryProjectRepository = new InMemoryProjectRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    
    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    const project = Project.create({
      name: "",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: team.id,
    });

    inMemoryTeamRepository.items.push(team);

    const createProjectService = new CreateProjectService(
      inMemoryProjectRepository,
      inMemoryTeamRepository
    );

    await expect(createProjectService.execute(project))
      .rejects.toThrow();
  });

  it("should be able to create a team without 'description' passed by props", async () => {
    const inMemoryProjectRepository = new InMemoryProjectRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    
    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    inMemoryTeamRepository.items.push(team);

    const createProjectService = new CreateProjectService(
      inMemoryProjectRepository,
      inMemoryTeamRepository
    );

    await expect(createProjectService.execute({
      name: "Project Test",
      description: undefined,
      team_id: team.id
    })).resolves.not.toThrow();
  });

  it("should not be able to create a project with an invalid 'team_id'", async () => {
    const inMemoryProjectRepository = new InMemoryProjectRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    
    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    const project = Project.create({
      name: "Project Test",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: team.id + "123Test",
    });

    inMemoryTeamRepository.items.push(team);

    const createProjectService = new CreateProjectService(
      inMemoryProjectRepository,
      inMemoryTeamRepository
    );

    await expect(createProjectService.execute(project))
      .rejects.toThrow();
  });
})