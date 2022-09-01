import { Project } from "../../../../src/domain/entities/Project";
import { ProjectTag } from "../../../../src/domain/entities/ProjectTag";
import { Team } from "../../../../src/domain/entities/Team";

import { InMemoryProjectRepository } from "../../../../tests/repositories/in-memory-project-repository";
import { InMemoryProjectTagRepository } from "../../../../tests/repositories/in-memory-project-tag-repository";

import { RemoveProjectTagService } from "./remove-project-tag-service";

describe("remove-project-tag-service", () => {
  const inMemoryProjectRepository = new InMemoryProjectRepository();

  const team = Team.create({
    name: "Team Test",
    description: "Lorem Ipsum Dolor Sit Amet"
  });

  const project = Project.create({
    name: "Project Test",
    description: "Lorem Ipsum Dolor Sit Amet",
    team_id: team.id
  });

  inMemoryProjectRepository.items.push(project);

  it("should be able to successfully remove project tag", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
       name: "Project Tag Test",
       project_id: project.id,
       team_id: team.id
    });
    
    inMemoryProjectTagRepository.items.push(project_tag);

    const removeProjectTagService = new RemoveProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    expect(inMemoryProjectTagRepository.items).toHaveLength(1);

    await expect(removeProjectTagService.execute({
      project_id: project.id,
      project_tag_id: project_tag.id
    })).resolves.not.toThrow();

    expect(inMemoryProjectTagRepository.items).toHaveLength(0);
  });

  it("should not be able to remove project tag without 'project_id'", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
       name: "Project Tag Test",
       project_id: project.id,
       team_id: team.id
    });
    
    inMemoryProjectTagRepository.items.push(project_tag);

    const removeProjectTagService = new RemoveProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    await expect(removeProjectTagService.execute({
      project_id: "",
      project_tag_id: project_tag.id
    })).rejects.toThrow();
  });

  it("should not be able to remove project tag without 'project_tag_id'", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
       name: "Project Tag Test",
       project_id: project.id,
       team_id: team.id
    });
    
    inMemoryProjectTagRepository.items.push(project_tag);

    const removeProjectTagService = new RemoveProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    await expect(removeProjectTagService.execute({
      project_id: project.id,
      project_tag_id: ""
    })).rejects.toThrow();
  });

  it("should not be able to remove project tag without a valid 'project_id'", async () => {
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const project_tag = ProjectTag.create({
       name: "Project Tag Test",
       project_id: project.id,
       team_id: team.id
    });
    
    inMemoryProjectTagRepository.items.push(project_tag);

    const removeProjectTagService = new RemoveProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    await expect(removeProjectTagService.execute({
      project_id: project.id + "123Test",
      project_tag_id: project_tag.id
    })).rejects.toThrow();
  });
})