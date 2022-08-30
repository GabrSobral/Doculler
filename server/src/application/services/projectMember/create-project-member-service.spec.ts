import { ProjectMember } from "../../../../src/domain/entities/ProjectMember";
import { Project } from "../../../../src/domain/entities/Project";
import { Team } from "../../../../src/domain/entities/Team";
import { TeamMember } from "../../../../src/domain/entities/TeamMember";
import { User } from "../../../../src/domain/entities/User";

import { InMemoryProjectRepository } from "../../../../tests/repositories/in-memory-project-repository";
import { InMemoryProjectMemberRepository } from "../../../../tests/repositories/in-memory-project-member-repository";
import { InMemoryTeamMemberRepository } from "../../../../tests/repositories/in-memory-team-member-repository";

import { CreateProjectMemberService } from "./create-project-member-service";

describe("create-project-member-service", () => {
  it("should be able to create a new project member", async () => {
    const inMemoryProjectRepository = new InMemoryProjectRepository();
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();

    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet",
    });

    const project = Project.create({
      name: "Project Test",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: team.id,
    });

    const user = User.create({
      name: "User Test",
      email: "Test@test.com",
      password: "123Test"
    });

    const teamMember = TeamMember.create({
      team_id: team.id,
      user_id: user.id
    });

    const projectMember = ProjectMember.create({
      project_id: project.id,
      team_id: team.id,
      team_member_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);
    inMemoryProjectRepository.items.push(project);
    inMemoryTeamMemberRepository.items.push(teamMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );

    await expect(createProjectMemberService.execute(projectMember))
      .resolves.not.toThrow();
    
  });
})