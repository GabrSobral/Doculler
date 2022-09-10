import { Project } from "../../../../src/domain/entities/Project/Project";
import { ProjectTag } from "../../../../src/domain/entities/ProjectTag/ProjectTag";
import { Team } from "../../../../src/domain/entities/Team/Team";

import { InMemoryProjectRepository } from "../../../../tests/repositories/in-memory-project-repository";
import { InMemoryProjectTagRepository } from "../../../../tests/repositories/in-memory-project-tag-repository";
import { CreateProjectTagService } from "./create-project-tag-service";

describe("create-project-tag-service", () => {
  const inMemoryProjectRepository = new InMemoryProjectRepository();

  const team = Team.create({
    name: "Team Test",
    description: "Lorem Ipsum Dolor Sit Amet"
  });

  if (team.isLeft())
    return;

  const project = Project.create({
    name: "Project Test",
    description: "Lorem Ipsum Dolor Sit Amet",
    team_id: team.value.id
  });

  if(project.isLeft())
    return;

  inMemoryProjectRepository.items.push(project.value);

  it("should be able to create a new tag without errors", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
      name: "Project Tag Test",
      project_id: project.value.id,
      team_id: team.value.id
    });

    if(project_tag.isLeft())
      return;
    
    inMemoryProjectTagRepository.items.push(project_tag.value);

    const createProjectTagService = new CreateProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    const projectTagOrError = await createProjectTagService.execute({
      name: project_tag.value.name.value,
      project_id: project_tag.value.project_id,
      team_id: project_tag.value.team_id
    });

    expect(projectTagOrError.isRight()).toBe(true);
  });

  it("should not be able to create a new tag without 'name'", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
      name: "",
      project_id: project.value.id,
      team_id: team.value.id
    });

    if(project_tag.isLeft())
      return
    
    inMemoryProjectTagRepository.items.push(project_tag.value);

    const createProjectTagService = new CreateProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    const projectTagOrError = await createProjectTagService.execute({
      name: project_tag.value.name.value,
      project_id: project_tag.value.project_id,
      team_id: project_tag.value.team_id
    });
    expect(projectTagOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new tag without 'project_id'", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
      name: "Project Tag Test",
      project_id: "",
      team_id: team.value.id
    });

    if(project_tag.isLeft())
      return
    
    inMemoryProjectTagRepository.items.push(project_tag.value);

    const createProjectTagService = new CreateProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    const projectTagOrError = await createProjectTagService.execute({
      name: project_tag.value.name.value,
      project_id: project_tag.value.project_id,
      team_id: project_tag.value.team_id
    });
    expect(projectTagOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new tag without 'team_id'", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
      name: "Project Tag Test",
      project_id: project.value.id,
      team_id: ""
    });

    if(project_tag.isLeft())
      return
    
    inMemoryProjectTagRepository.items.push(project_tag.value);

    const createProjectTagService = new CreateProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    const projectTagOrError = await createProjectTagService.execute({
      name: project_tag.value.name.value,
      project_id: project_tag.value.project_id,
      team_id: project_tag.value.team_id
    });
    expect(projectTagOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new tag without a valid 'project_id'", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
      name: "Project Tag Test",
      project_id: project.value.id + "123Test",
      team_id: team.value.id
    });

    if(project_tag.isLeft())
      return
    
    inMemoryProjectTagRepository.items.push(project_tag.value);

    const createProjectTagService = new CreateProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    const projectTagOrError = await createProjectTagService.execute({
      name: project_tag.value.name.value,
      project_id: project_tag.value.project_id,
      team_id: project_tag.value.team_id
    });
    expect(projectTagOrError.isLeft()).toBe(true);
  });
});