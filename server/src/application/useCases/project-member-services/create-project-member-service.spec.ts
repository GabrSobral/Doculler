import { ProjectMember } from "../../../domain/entities/ProjectMember/ProjectMember";
import { Project } from "../../../domain/entities/Project/Project";
import { Team } from "../../../domain/entities/Team/Team";
import { TeamMember } from "../../../domain/entities/TeamMember/TeamMember";
import { User } from "../../../domain/entities/User/User";

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

  if(team.isLeft())
    return;

  const project = Project.create({
    name: "Project Test",
    description: "Lorem Ipsum Dolor Sit Amet",
    team_id: team.value.id,
  });

  if(project.isLeft())
    return;

  const user = User.create({
    name: "User Test",
    email: "Test@test.com",
    password: "123Test"
  });

  if(user.isLeft())
    return;

  const teamMember = TeamMember.create({
    team_id: team.value.id,
    user_id: user.value.id
  });

  inMemoryProjectRepository.items.push(project.value);
  inMemoryTeamMemberRepository.items.push(teamMember);

  it("should be able to create a new project member", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.value.id,
      team_id: team.value.id,
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
      team_id: team.value.id,
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );
    
    const projectMemberOrError = await createProjectMemberService.execute(projectMember);

    expect(projectMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new project member without 'team_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.value.id,
      team_id: "",
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );
    
    const projectMemberOrError = await createProjectMemberService.execute(projectMember);

    expect(projectMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new project member without 'team_member_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.value.id,
      team_id: team.value.id,
      user_id: "",
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );
    
    const projectMemberOrError = await createProjectMemberService.execute(projectMember);

    expect(projectMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new project member without 'team_member_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.value.id,
      team_id: team.value.id,
      user_id: "",
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );
    
    const projectMemberOrError = await createProjectMemberService.execute(projectMember);

    expect(projectMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new project member without a valid 'project_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.value.id + "123Test",
      team_id: team.value.id,
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );
    
    const projectMemberOrError = await createProjectMemberService.execute(projectMember);

    expect(projectMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new project member without a valid 'team_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.value.id,
      team_id: team.value.id + "123Test",
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );
    
    const projectMemberOrError = await createProjectMemberService.execute(projectMember);

    expect(projectMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new project member without a valid Team Member", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.value.id,
      team_id: team.value.id,
      user_id: teamMember.user_id + "123Test",
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );
    
    const projectMemberOrError = await createProjectMemberService.execute(projectMember);

    expect(projectMemberOrError.isLeft()).toBe(true);
  });
  it("should not be able to create a new project member without a provide a valid 'project_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.value.id,
      team_id: team.value.id,
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );
    
    const projectMemberOrError = await createProjectMemberService.execute({
      project_id: "",
      team_id: projectMember.team_id,
      user_id: projectMember.user_id
    });

    expect(projectMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new project member without a provide a valid 'team_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.value.id,
      team_id: team.value.id,
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );
    
    const projectMemberOrError = await createProjectMemberService.execute({
      project_id: projectMember.project_id,
      team_id: "",
      user_id: projectMember.user_id
    });

    expect(projectMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new project member without a provide a valid 'user_id'", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: project.value.id,
      team_id: team.value.id,
      user_id: teamMember.user_id,
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );
    
    const projectMemberOrError = await createProjectMemberService.execute({
      project_id: projectMember.project_id,
      team_id: projectMember.team_id,
      user_id: ""
    });

    expect(projectMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new project member without a valid project member instance", async () => {
    const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();

    const projectMember = ProjectMember.create({
      project_id: "",
      team_id: "",
      user_id: "",
    });

    inMemoryProjectMemberRepository.items.push(projectMember);

    const createProjectMemberService = new CreateProjectMemberService(
      inMemoryProjectRepository,
      inMemoryProjectMemberRepository,
      inMemoryTeamMemberRepository,
    );
    
    const projectMemberOrError = await createProjectMemberService.execute({
      project_id: projectMember.project_id,
      team_id: projectMember.team_id,
      user_id: projectMember.user_id
    });

    expect(projectMemberOrError.isLeft()).toBe(true);
  });
})