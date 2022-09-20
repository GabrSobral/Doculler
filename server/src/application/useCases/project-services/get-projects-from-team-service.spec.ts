import { TeamMember } from "../../../domain/entities/TeamMember/TeamMember";
import { Team } from "../../../domain/entities/Team/Team";
import { User } from "../../../domain/entities/User/User";
import { Project } from "../../../domain/entities/Project/Project";

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

  if(user.isLeft())
    return;

  // Team One ======================================================================================
  const teamOne = Team.create({
    name: "Team Test",
    description: "Lorem Ipsum Dolor Sit Amet"
  });

  if(teamOne.isLeft())
    return;

  inMemoryTeamRepository.items.push(teamOne.value);

  const teamMemberOne = TeamMember.create({
    team_id: teamOne.value.id,
    user_id: user.value.id
  });

  inMemoryTeamMemberRepository.items.push(teamMemberOne);

  const projectOne_TeamOne = Project.create({
    name: "Project 1 - Team One",
    description: "Project test for Team One",
    team_id: teamOne.value.id
  });

  if(projectOne_TeamOne.isLeft())
    return;

  inMemoryProjectRepository.items.push(projectOne_TeamOne.value);

  const projectTwo_TeamOne = Project.create({
    name: "Project 2 - Team One",
    description: "Project test for Team One",
    team_id: teamOne.value.id
  });

  if(projectTwo_TeamOne.isLeft())
    return;

  inMemoryProjectRepository.items.push(projectTwo_TeamOne.value);
  
  // Team Two ======================================================================================
  const teamTwo = Team.create({
    name: "Team Test",
    description: "Lorem Ipsum Dolor Sit Amet"
  });

  if(teamTwo.isLeft())
    return;

  inMemoryTeamRepository.items.push(teamTwo.value);

  const teamMemberTwo = TeamMember.create({
    team_id: teamTwo.value.id,
    user_id: user.value.id
  });

  inMemoryTeamMemberRepository.items.push(teamMemberTwo);

  const projectOne_TeamTwo = Project.create({
    name: "Project 1 - Team Two",
    description: "Project test for Team Two",
    team_id: teamTwo.value.id
  });
    
    if(projectOne_TeamTwo.isLeft())
      return;

  inMemoryProjectRepository.items.push(projectOne_TeamTwo.value);

  const projectTwo_TeamTwo = Project.create({
    name: "Project 2 - Team Two",
    description: "Project test for Team Two",
    team_id: teamTwo.value.id
  });

  if(projectTwo_TeamTwo.isLeft())
    return;

  inMemoryProjectRepository.items.push(projectTwo_TeamTwo.value);

  const projectThree_TeamTwo = Project.create({
    name: "Project 3 - Team Two",
    description: "Project test for Team Two",
    team_id: teamTwo.value.id
  });

  if(projectThree_TeamTwo.isLeft())
    return;

  inMemoryProjectRepository.items.push(projectThree_TeamTwo.value);


  it("should be able to get all projects from a specific team", async () => {
    const getProjectsFromTeam = new GetProjectsFromTeam(
      inMemoryProjectRepository,
      inMemoryTeamMemberRepository
    );

    const projectsFromTeamOne = await getProjectsFromTeam.execute(teamMemberOne);
    const projectsFromTeamTwo = await getProjectsFromTeam.execute(teamMemberTwo);
    
    expect(projectsFromTeamOne.value).toHaveLength(2);
    expect(projectsFromTeamTwo.value).toHaveLength(3);
  });

  it("should not be able to get all projects from a specific team without 'team_id'", async () => {
    const getProjectsFromTeam = new GetProjectsFromTeam(
      inMemoryProjectRepository,
      inMemoryTeamMemberRepository
    );

    const projectsOrError = await getProjectsFromTeam.execute({
      team_id: "",
      user_id: teamMemberOne.user_id
    });

    expect(projectsOrError.isLeft()).toBe(true);
  });

  it("should not be able to get all projects from a specific team without 'user_id'", async () => {
    const getProjectsFromTeam = new GetProjectsFromTeam(
      inMemoryProjectRepository,
      inMemoryTeamMemberRepository
    );

    const projectsOrError = await getProjectsFromTeam.execute({
      team_id: teamMemberOne.team_id,
      user_id: ""
    });

    expect(projectsOrError.isLeft()).toBe(true);
  });

  it("should not be able to get all projects from a specific team without a valid 'team_member'", async () => {
    const getProjectsFromTeam = new GetProjectsFromTeam(
      inMemoryProjectRepository,
      inMemoryTeamMemberRepository
    );

    const projectsOrError = await getProjectsFromTeam.execute({
      team_id: teamMemberOne.team_id,
      user_id: teamMemberOne.user_id + "123Test"
    });

    expect(projectsOrError.isLeft()).toBe(true);
  });
})