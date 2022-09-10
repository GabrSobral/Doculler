import { User } from "../../../domain/entities/User/User";
import { Team } from "../../../domain/entities/Team/Team";
import { Project } from "../../../domain/entities/Project/Project";
import { TeamMember } from "../../../domain/entities/TeamMember/TeamMember";
import { ProjectMember } from "../../../domain/entities/ProjectMember/ProjectMember";

import { InMemoryProjectRepository } from "../../../../tests/repositories/in-memory-project-repository";
import { InMemoryTeamMemberRepository } from "../../../../tests/repositories/in-memory-team-member-repository";
import { InMemoryProjectMemberRepository } from "../../../../tests/repositories/in-memory-project-member-repository"
import { InMemoryTeamRepository } from "../../../../tests/repositories/in-memory-team-repository";

import { RemoveProjectMemberService } from "./remove-project-member-service";

describe("remove-project-member-service", () => {
  const inMemoryProjectRepository = new InMemoryProjectRepository();
  const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
  const inMemoryProjectMemberRepository = new InMemoryProjectMemberRepository();
  const inMemoryTeamRepository = new InMemoryTeamRepository();

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

  if(teamMember.isLeft())
    return;

  const projectMember = ProjectMember.create({
    project_id: project.value.id,
    team_id: team.value.id,
    user_id: teamMember.value.user_id,
  });

  if(projectMember.isLeft())
    return;

  //Second mock ====================================================================================

  const teamTwo = Team.create({
    name: "Team Test",
    description: "Lorem Ipsum Dolor Sit Amet",
  });

  if(teamTwo.isLeft())
    return;

  const projectTwo = Project.create({
    name: "Project Test",
    description: "Lorem Ipsum Dolor Sit Amet",
    team_id: teamTwo.value.id,
  });

  if(projectTwo.isLeft())
    return;

  const userTwo = User.create({
    name: "User Test",
    email: "Test@test.com",
    password: "123Test"
  });

  if(userTwo.isLeft())
    return;

  const teamMemberTwo = TeamMember.create({
    team_id: teamTwo.value.id,
    user_id: userTwo.value.id
  });

  if(teamMemberTwo.isLeft())
    return;

  const projectMemberTwo = ProjectMember.create({
    project_id: projectTwo.value.id,
    team_id: teamTwo.value.id,
    user_id: teamMemberTwo.value.user_id,
  });

  if(projectMemberTwo.isLeft())
    return;

  inMemoryProjectRepository.items.push(project.value);
  inMemoryProjectRepository.items.push(projectTwo.value);

  inMemoryTeamMemberRepository.items.push(teamMember.value);
  inMemoryTeamMemberRepository.items.push(teamMemberTwo.value);

  inMemoryTeamRepository.items.push(team.value);
  inMemoryTeamRepository.items.push(teamTwo.value);

  inMemoryProjectMemberRepository.items.push(projectMember.value);
  inMemoryProjectMemberRepository.items.push(projectMemberTwo.value);

  const removeProjectMemberService = new RemoveProjectMemberService(
    inMemoryTeamRepository,
    inMemoryProjectRepository,
    inMemoryProjectMemberRepository
  );
  
  it("should be able to remove a project member", async () => {
    expect(inMemoryProjectMemberRepository.items).toHaveLength(2);

    await removeProjectMemberService.execute({
      project_id: project.value.id,
      team_id: team.value.id,
      user_id: user.value.id
    });

    expect(inMemoryProjectMemberRepository.items).toHaveLength(1);
  });

  it("should not be able to remove a project member without 'team_id'", async () => {
    const resultOrError = await removeProjectMemberService.execute({
      project_id: project.value.id,
      team_id: "",
      user_id: user.value.id
    });

    expect(resultOrError.isLeft()).toBe(true);
  });

  it("should not be able to remove a project member without 'project_id'", async () => {
    const resultOrError = await removeProjectMemberService.execute({
      project_id: "",
      team_id: team.value.id,
      user_id: user.value.id
    });

    expect(resultOrError.isLeft()).toBe(true);
  });

  it("should not be able to remove a project member without 'user_id'", async () => {
    const resultOrError = await removeProjectMemberService.execute({
      project_id: project.value.id,
      team_id: team.value.id,
      user_id: ""
    });

    expect(resultOrError.isLeft()).toBe(true);
  });

  it("should not be able to remove a project member without a valid 'team_id'", async () => {
    const resultOrError = await removeProjectMemberService.execute({
      project_id: project.value.id,
      team_id: team.value.id + "123Test",
      user_id: user.value.id
    });

    expect(resultOrError.isLeft()).toBe(true);
  });

  it("should not be able to remove a project member without a valid 'project_id'", async () => {
    const resultOrError = await removeProjectMemberService.execute({
      project_id: project.value.id + "123Test",
      team_id: team.value.id,
      user_id: user.value.id
    });

    expect(resultOrError.isLeft()).toBe(true);
  });
})