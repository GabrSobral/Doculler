import { InMemoryTeamRepository } from "../../../../tests/repositories/in-memory-team-repository";
import { InMemoryTeamMemberRepository } from "../../../../tests/repositories/in-memory-team-member-repository";

import { User } from "../../../../src/domain/entities/User";
import { Team } from "../../../../src/domain/entities/Team";
import { TeamMember } from "../../../../src/domain/entities/TeamMember";

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

    const teamMember = TeamMember.create({
      team_id: team.id,
      user_id: user.id
    });

    inMemoryTeamMemberRepository.items.push(teamMember);
    inMemoryTeamRepository.items.push(team);

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

    const teamMember = TeamMember.create({
      team_id: "",
      user_id: user.id
    });

    inMemoryTeamMemberRepository.items.push(teamMember);

    const removeTeamMemberService = new RemoveTeamMemberService (
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository
    );

    await expect(removeTeamMemberService.execute({ 
      team_id: teamMember.team_id,
      user_id: teamMember.user_id
    })).rejects.toThrow();
  });

  it("should not be able to remove a team member without user_id", async () => {
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();

    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    const teamMember = TeamMember.create({
      team_id: team.id,
      user_id: ""
    });

    inMemoryTeamMemberRepository.items.push(teamMember);
    inMemoryTeamRepository.items.push(team);

    const removeTeamMemberService = new RemoveTeamMemberService (
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository
    );

    await expect(removeTeamMemberService.execute ({ 
      team_id: teamMember.team_id,
      user_id: teamMember.user_id
    })).rejects.toThrow();
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

    const teamMember = TeamMember.create({
      team_id: team.id,
      user_id: user.id
    });

    inMemoryTeamMemberRepository.items.push(teamMember);
    inMemoryTeamRepository.items.push(team);

    const removeTeamMemberService = new RemoveTeamMemberService (
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository
    );

    await expect(removeTeamMemberService.execute ({ 
      team_id: teamMember.team_id + '123Test',
      user_id: teamMember.user_id
    })).rejects.toThrow();
  });
})