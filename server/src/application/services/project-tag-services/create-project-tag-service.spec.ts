import { Project } from "../../../../src/domain/entities/Project";
import { ProjectTag } from "../../../../src/domain/entities/ProjectTag";
import { Team } from "../../../../src/domain/entities/Team";

import { InMemoryProjectRepository } from "../../../../tests/repositories/in-memory-project-repository";
import { InMemoryProjectTagRepository } from "../../../../tests/repositories/in-memory-project-tag-repository";
import { CreateProjectTagService } from "./create-project-tag-service";

describe("", () => {
  it("should be able to create a new tag without errors", async () => {
    const inMemoryProjectRepository = new InMemoryProjectRepository();
    const inMemoryProjectTagRepository = new InMemoryProjectTagRepository();

    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    const project = Project.create({
      name: "Project Test",
       description: "Lorem Ipsum Dolor Sit Amet",
       team_id: team.id
    });

    const project_tag = ProjectTag.create({
       name: "Project Tag Test",
       project_id: project.id,
       team_id: team.id
    });
    
    inMemoryProjectRepository.items.push(project);
    inMemoryProjectTagRepository.items.push(project_tag);

    const createProjectTagService = new CreateProjectTagService(
      inMemoryProjectTagRepository,
      inMemoryProjectRepository
    );

    await expect(createProjectTagService.execute(project_tag))
      .resolves.not.toThrow();
  });
});