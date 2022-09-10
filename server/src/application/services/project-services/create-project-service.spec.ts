import { InMemoryTeamRepository } from '../../../../tests/repositories/in-memory-team-repository';
import { Project } from '../../../domain/entities/Project/Project';
import { Team } from '../../../domain/entities/Team/Team';
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

    if(team.isLeft())
      return;

    const project = Project.create({
      name: "Project Test",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: team.value.id,
    });

    if(project.isLeft())
      return;

    inMemoryTeamRepository.items.push(team.value);

    const createProjectService = new CreateProjectService(
      inMemoryProjectRepository,
      inMemoryTeamRepository
    );

    const projectResult = await createProjectService.execute({
      name: project.value.name.value,
      team_id: project.value.team_id,
      description: project.value.description
    });

    expect(projectResult.isRight()).toBe(true);
  });

  it("should not be able to create a team without team_it passed by props", async () => {
    const inMemoryProjectRepository = new InMemoryProjectRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();

    const project = Project.create({
      name: "Project Test",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: "",
    });

    if(project.isLeft())
      return;

    inMemoryProjectRepository.items.push(project.value);

    const createProjectService = new CreateProjectService(
      inMemoryProjectRepository,
      inMemoryTeamRepository
    );

    const projectResult = await createProjectService.execute({
      name: project.value.name.value,
      team_id: project.value.team_id,
      description: project.value.description
    });

    expect(projectResult.isLeft()).toBe(true);
  });

  it("should not be able to create a team without 'name' passed by props", async () => {
    const inMemoryProjectRepository = new InMemoryProjectRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    
    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    if(team.isLeft())
      return;

    const project = Project.create({
      name: "",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: team.value.id,
    });

    if(project.isLeft())
      return;

    inMemoryTeamRepository.items.push(team.value);

    const createProjectService = new CreateProjectService(
      inMemoryProjectRepository,
      inMemoryTeamRepository
    );

    const projectResult = await createProjectService.execute({
      name: project.value.name.value,
      team_id: project.value.team_id,
      description: project.value.description
    });

    expect(projectResult.isLeft()).toBe(true);
  });

  it("should be able to create a team without 'description' passed by props", async () => {
    const inMemoryProjectRepository = new InMemoryProjectRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    
    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    if(team.isLeft())
      return;

    inMemoryTeamRepository.items.push(team.value);

    const createProjectService = new CreateProjectService(
      inMemoryProjectRepository,
      inMemoryTeamRepository
    );

    const project = Project.create({
      name: "Project Test",
      description: undefined,
      team_id: team.value.id
    });

    if(project.isLeft())
      return;

    const projectResult = await createProjectService.execute({
      name: project.value.name.value,
      team_id: project.value.team_id,
      description: project.value.description
    });

    expect(projectResult.isRight()).toBe(true);
  });

  it("should not be able to create a project with an invalid 'team_id'", async () => {
    const inMemoryProjectRepository = new InMemoryProjectRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    
    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    if(team.isLeft())
      return;

    const project = Project.create({
      name: "Project Test",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: team.value.id + "123Test",
    });

    if(project.isLeft())
      return;

    inMemoryTeamRepository.items.push(team.value);

    const createProjectService = new CreateProjectService(
      inMemoryProjectRepository,
      inMemoryTeamRepository
    );

    const projectResult = await createProjectService.execute({
      name: project.value.name.value,
      team_id: project.value.team_id,
      description: project.value.description
    });

    expect(projectResult.isLeft()).toBe(true);
  });
})