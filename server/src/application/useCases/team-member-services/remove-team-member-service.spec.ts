import { InMemoryTeamRepository } from "../../../../tests/repositories/in-memory-team-repository";
import { InMemoryTeamMemberRepository } from "../../../../tests/repositories/in-memory-team-member-repository";

import { User } from "../../../domain/entities/User/User";
import { Team } from "../../../domain/entities/Team/Team";
import { TeamMember } from "../../../domain/entities/TeamMember/TeamMember";

import { RemoveTeamMemberService } from "./remove-team-member-service";

describe("remove-team-member", () => {
  it("should be able to remove a team member", async () => {
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();

    const user = User.create({
      name: "User Test",
      email: "Test@test.com",
      password: "a123"
    });

    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    if(user.isLeft() || team.isLeft())
      return;

    const teamMember = TeamMember.create({
      team_id: team.value.id,
      user_id: user.value.id
    });

    inMemoryTeamMemberRepository.items.push(teamMember);
    inMemoryTeamRepository.items.push(team.value);

    const removeTeamMemberService = new RemoveTeamMemberService (
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository
    );

    await expect(removeTeamMemberService.execute({ 
      team_id: teamMember.team_id, 
      user_id: teamMember.user_id 
    })).resolves.not.toThrow();
  });

  it("should not be able to remove a team member without team_id", async () => {
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();

    const user = User.create({
      name: "User Test",
      email: "Test@test.com",
      password: "a123"
    });

    if(user.isLeft())
      return;

    const teamMember = TeamMember.create({
      team_id: "",
      user_id: user.value.id
    });

    inMemoryTeamMemberRepository.items.push(teamMember);

    const removeTeamMemberService = new RemoveTeamMemberService (
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository
    );

    const resultOrError = await removeTeamMemberService.execute({ 
      team_id: teamMember.team_id,
      user_id: teamMember.user_id
    });

    expect(resultOrError.isLeft()).toBe(true)
  });

  it("should not be able to remove a team member without user_id", async () => {
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();

    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    if(team.isLeft())
      return;

    const teamMember = TeamMember.create({
      team_id: team.value.id,
      user_id: ""
    });

    inMemoryTeamMemberRepository.items.push(teamMember);
    inMemoryTeamRepository.items.push(team.value);

    const removeTeamMemberService = new RemoveTeamMemberService (
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository
    );

    const resultOrError = await removeTeamMemberService.execute ({ 
      team_id: teamMember.team_id,
      user_id: teamMember.user_id
    });

    expect(resultOrError.isLeft()).toBe(true);
  });

  it("should not be able to remove a team member without user_id", async () => {
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();

    const user = User.create({
      name: "User Test",
      email: "Test@test.com",
      password: "a123"
    });

    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    if(user.isLeft() || team.isLeft())
      return;

    const teamMember = TeamMember.create({
      team_id: team.value.id,
      user_id: user.value.id
    });

    inMemoryTeamMemberRepository.items.push(teamMember);
    inMemoryTeamRepository.items.push(team.value);

    const removeTeamMemberService = new RemoveTeamMemberService (
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository
    );

    const teamMemberOrError = await removeTeamMemberService.execute ({ 
      team_id: teamMember.team_id + '123Test',
      user_id: teamMember.user_id
    });

    expect(teamMemberOrError?.isLeft()).toBe(true);
  });
})