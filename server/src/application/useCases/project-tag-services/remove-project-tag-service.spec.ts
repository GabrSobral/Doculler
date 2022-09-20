import { Project } from "../../../domain/entities/Project/Project";
import { ProjectTag } from "../../../domain/entities/ProjectTag/ProjectTag";
import { Team } from "../../../domain/entities/Team/Team";

import { InMemoryProjectRepository } from "../../../../tests/repositories/in-memory-project-repository";
import { InMemoryProjectTagRepository } from "../../../../tests/repositories/in-memory-project-tag-repository";

import { RemoveProjectTagService } from "./remove-project-tag-service";

describe("remove-project-tag-service", () => {
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

  it("should be able to successfully remove project tag", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
       name: "Project Tag Test",
       project_id: project.value.id,
       team_id: team.value.id
    });

    if(project_tag.isLeft())
      return;
    
    inMemoryProjectTagRepository.items.push(project_tag.value);

    const removeProjectTagService = new RemoveProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    expect(inMemoryProjectTagRepository.items).toHaveLength(1);

    await expect(removeProjectTagService.execute({
      project_id: project.value.id,
      project_tag_id: project_tag.value.id
    })).resolves.not.toThrow();

    expect(inMemoryProjectTagRepository.items).toHaveLength(0);
  });

  it("should not be able to remove project tag without 'project_id'", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
       name: "Project Tag Test",
       project_id: project.value.id,
       team_id: team.value.id
    });

    if(project_tag.isLeft())
      return;
    
    inMemoryProjectTagRepository.items.push(project_tag.value);

    const removeProjectTagService = new RemoveProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    await expect(removeProjectTagService.execute({
      project_id: "",
      project_tag_id: project_tag.value.id
    })).rejects.toThrow();
  });

  it("should not be able to remove project tag without 'project_tag_id'", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
       name: "Project Tag Test",
       project_id: project.value.id,
       team_id: team.value.id
    });

    if(project_tag.isLeft())
      return;
    
    inMemoryProjectTagRepository.items.push(project_tag.value);

    const removeProjectTagService = new RemoveProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    await expect(removeProjectTagService.execute({
      project_id: project.value.id,
      project_tag_id: ""
    })).rejects.toThrow();
  });

  it("should not be able to remove project tag without a valid 'project_id'", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
       name: "Project Tag Test",
       project_id: project.value.id,
       team_id: team.value.id
    });

    if(project_tag.isLeft())
      return;
    
    inMemoryProjectTagRepository.items.push(project_tag.value);

    const removeProjectTagService = new RemoveProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    await expect(removeProjectTagService.execute({
      project_id: project.value.id + "123Test",
      project_tag_id: project_tag.value.id
    })).rejects.toThrow();
  });
})