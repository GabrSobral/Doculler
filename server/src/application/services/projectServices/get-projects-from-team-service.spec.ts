import { TeamMember } from "../../../../src/domain/entities/TeamMember";
import { Team } from "../../../../src/domain/entities/Team";
import { User } from "../../../../src/domain/entities/User";
import { Project } from "../../../../src/domain/entities/Project";

import { InMemoryProjectRepository } from "../../../../tests/repositories/in-memory-project-repository";
import { InMemoryTeamMemberRepository } from "../../../../tests/repositories/in-memory-team-member-repository";
import { InMemoryTeamRepository } from "../../../../tests/repositories/in-memory-team-repository";
import { GetProjectsFromTeam } from "./get-projects-from-team-service";

describe("get-projects-from-team-service", () => {
  const inMemoryTeamRepository = new InMemoryTeamRepository();
  const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
  const inMemoryProjectRepository = new InMemoryProjectRepository();

  const user = User.create({
    name: "Test",
    email: "Test@test.com",
    password: "test123"
  });

  // Team One ======================================================================================
  const teamOne = Team.create({
    name: "Team Test",
    description: "Lorem Ipsum Dolor Sit Amet"
  });
  inMemoryTeamRepository.items.push(teamOne);

  const teamMemberOne = TeamMember.create({
    team_id: teamOne.id,
    user_id: user.id
  });
  inMemoryTeamMemberRepository.items.push(teamMemberOne);

  const projectOne_TeamOne = Project.create({
    name: "Project 1 - Team One",
    description: "Project test for Team One",
    team_id: teamOne.id
  });
  inMemoryProjectRepository.items.push(projectOne_TeamOne);

  const projectTwo_TeamOne = Project.create({
    name: "Project 2 - Team One",
    description: "Project test for Team One",
    team_id: teamOne.id
  });
  inMemoryProjectRepository.items.push(projectTwo_TeamOne);
  
  // Team Two ======================================================================================
  const teamTwo = Team.create({
    name: "Team Test",
    description: "Lorem Ipsum Dolor Sit Amet"
  });
  inMemoryTeamRepository.items.push(teamTwo);

  const teamMemberTwo = TeamMember.create({
    team_id: teamTwo.id,
    user_id: user.id
  });
  inMemoryTeamMemberRepository.items.push(teamMemberTwo);

  const projectOne_TeamTwo = Project.create({
    name: "Project 1 - Team Two",
    description: "Project test for Team Two",
    team_id: teamTwo.id
  });
  inMemoryProjectRepository.items.push(projectOne_TeamTwo);

  const projectTwo_TeamTwo = Project.create({
    name: "Project 2 - Team Two",
    description: "Project test for Team Two",
    team_id: teamTwo.id
  });
  inMemoryProjectRepository.items.push(projectTwo_TeamTwo);

  const projectThree_TeamTwo = Project.create({
    name: "Project 3 - Team Two",
    description: "Project test for Team Two",
    team_id: teamTwo.id
  });
  inMemoryProjectRepository.items.push(projectThree_TeamTwo);


  it("should be able to get all projects from a specific team", async () => {
    const getProjectsFromTeam = new GetProjectsFromTeam(
      inMemoryProjectRepository,
      inMemoryTeamMemberRepository
    );

    const projectsFromTeamOne = await getProjectsFromTeam.execute(teamMemberOne);
    const projectsFromTeamTwo = await getProjectsFromTeam.execute(teamMemberTwo);
    
    expect(projectsFromTeamOne).toHaveLength(2);
    expect(projectsFromTeamTwo).toHaveLength(3);
  });

  it("should not be able to get all projects from a specific team without 'team_id'", async () => {
    const getProjectsFromTeam = new GetProjectsFromTeam(
      inMemoryProjectRepository,
      inMemoryTeamMemberRepository
    );

    await expect(getProjectsFromTeam.execute({
      team_id: "",
      user_id: teamMemberOne.user_id
    })).rejects.toThrow();
  });

  it("should not be able to get all projects from a specific team without 'user_id'", async () => {
    const getProjectsFromTeam = new GetProjectsFromTeam(
      inMemoryProjectRepository,
      inMemoryTeamMemberRepository
    );

    await expect(getProjectsFromTeam.execute({
      team_id: teamMemberOne.team_id,
      user_id: ""
    })).rejects.toThrow();
  });

  it("should not be able to get all projects from a specific team without a valid 'team_member'", async () => {
    const getProjectsFromTeam = new GetProjectsFromTeam(
      inMemoryProjectRepository,
      inMemoryTeamMemberRepository
    );

    await expect(getProjectsFromTeam.execute({
      team_id: teamMemberOne.team_id,
      user_id: teamMemberOne.user_id + "123Test"
    })).rejects.toThrow();
  });
})