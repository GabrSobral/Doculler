import { ProjectMember } from "../../../domain/entities/ProjectMember";
import { Project } from "../../../domain/entities/Project";
import { Team } from "../../../domain/entities/Team";
import { TeamMember } from "../../../domain/entities/TeamMember";
import { User } from "../../../domain/entities/User";

import { InMemoryProjectRepository } from "../../../../tests/repositories/in-memory-project-repository";
import { InMemoryProjectMemberRepository } from "../../../../tests/repositories/in-memory-project-member-repository";
import { InMemoryTeamMemberRepository } from "../../../../tests/repositories/in-memory-team-member-repository";

import { CreateProjectMemberService } from "./create-project-member-service";

describe("create-project-member-service", () => {
  const inMemoryProjectRepository = new InMemoryProjectRepository();
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

  inMemoryProjectRepository.items.push(project);
  inMemoryTeamMemberRepository.items.push(teamMember);

  it("should be able to create a new project member", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.id,
      team_id: team.id,
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );

    await expect(createProjectMemberService.execute(projectMember))
      .resolves.not.toThrow();
  });

  it("should not be able to create a new project member without 'project_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: "",
      team_id: team.id,
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );

    await expect(createProjectMemberService.execute(projectMember))
      .rejects.toThrow();
  });

  it("should not be able to create a new project member without 'team_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.id,
      team_id: "",
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );

    await expect(createProjectMemberService.execute(projectMember))
      .rejects.toThrow();
  });

  it("should not be able to create a new project member without 'team_member_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.id,
      team_id: team.id,
      user_id: "",
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );

    await expect(createProjectMemberService.execute(projectMember))
      .rejects.toThrow();
  });

  it("should not be able to create a new project member without 'team_member_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.id,
      team_id: team.id,
      user_id: "",
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );

    await expect(createProjectMemberService.execute(projectMember))
      .rejects.toThrow();
  });

  it("should not be able to create a new project member without a valid 'project_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.id + "123Test",
      team_id: team.id,
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );

    await expect(createProjectMemberService.execute(projectMember))
      .rejects.toThrow();
  });

  it("should not be able to create a new project member without a valid 'team_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.id,
      team_id: team.id + "123Test",
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );

    await expect(createProjectMemberService.execute(projectMember))
      .rejects.toThrow();
  });

  it("should not be able to create a new project member without a valid Team Member", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.id,
      team_id: team.id,
      user_id: teamMember.user_id + "123Test",
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );

    await expect(createProjectMemberService.execute(projectMember))
      .rejects.toThrow();
  });
})