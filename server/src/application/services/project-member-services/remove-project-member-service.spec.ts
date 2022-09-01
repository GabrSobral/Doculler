import { User } from "../../../domain/entities/User";
import { Team } from "../../../domain/entities/Team";
import { Project } from "../../../domain/entities/Project";
import { TeamMember } from "../../../domain/entities/TeamMember";
import { ProjectMember } from "../../../domain/entities/ProjectMember";

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
    user_id: teamMember.user_id,
  });

  //Second mock ====================================================================================

  const teamTwo = Team.create({
    name: "Team Test",
    description: "Lorem Ipsum Dolor Sit Amet",
  });

  const projectTwo = Project.create({
    name: "Project Test",
    description: "Lorem Ipsum Dolor Sit Amet",
    team_id: teamTwo.id,
  });

  const userTwo = User.create({
    name: "User Test",
    email: "Test@test.com",
    password: "123Test"
  });

  const teamMemberTwo = TeamMember.create({
    team_id: teamTwo.id,
    user_id: userTwo.id
  });

  const projectMemberTwo = ProjectMember.create({
    project_id: projectTwo.id,
    team_id: teamTwo.id,
    user_id: teamMemberTwo.user_id,
  });

  inMemoryProjectRepository.items.push(project);
  inMemoryProjectRepository.items.push(projectTwo);

  inMemoryTeamMemberRepository.items.push(teamMember);
  inMemoryTeamMemberRepository.items.push(teamMemberTwo);

  inMemoryTeamRepository.items.push(team);
  inMemoryTeamRepository.items.push(teamTwo);

  inMemoryProjectMemberRepository.items.push(projectMember);
  inMemoryProjectMemberRepository.items.push(projectMemberTwo);

  const removeProjectMemberService = new RemoveProjectMemberService(
    inMemoryTeamRepository,
    inMemoryProjectRepository,
    inMemoryProjectMemberRepository
  );
  
  it("should be able to remove a project member", async () => {
    expect(inMemoryProjectMemberRepository.items).toHaveLength(2);

    await removeProjectMemberService.execute({
      project_id: project.id,
      team_id: team.id,
      user_id: user.id
    });

    expect(inMemoryProjectMemberRepository.items).toHaveLength(1);
  });

  it("should not be able to remove a project member without 'team_id'", async () => {
    await expect(removeProjectMemberService.execute({
      project_id: project.id,
      team_id: "",
      user_id: user.id
    })).rejects.toThrow();
  });

  it("should not be able to remove a project member without 'project_id'", async () => {
    await expect(removeProjectMemberService.execute({
      project_id: "",
      team_id: team.id,
      user_id: user.id
    })).rejects.toThrow();
  });

  it("should not be able to remove a project member without 'user_id'", async () => {
    await expect(removeProjectMemberService.execute({
      project_id: project.id,
      team_id: team.id,
      user_id: ""
    })).rejects.toThrow();
  });

  it("should not be able to remove a project member without a valid 'team_id'", async () => {
    await expect(removeProjectMemberService.execute({
      project_id: project.id,
      team_id: team.id + "123Test",
      user_id: user.id
    })).rejects.toThrow();
  });

  it("should not be able to remove a project member without a valid 'project_id'", async () => {
    await expect(removeProjectMemberService.execute({
      project_id: project.id + "123Test",
      team_id: team.id,
      user_id: user.id
    })).rejects.toThrow();
  });
})