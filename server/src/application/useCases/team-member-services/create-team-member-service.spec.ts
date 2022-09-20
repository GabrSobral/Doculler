import { Team } from '../../../domain/entities/Team/Team';
import { User } from '../../../domain/entities/User/User';

import { InMemoryTeamRepository } from '../../../../tests/repositories/in-memory-team-repository';
import { InMemoryTeamMemberRepository } from '../../../../tests/repositories/in-memory-team-member-repository';
import { InMemoryUserRepository } from '../../../../tests/repositories/in-memory-user-repository';

import { CreateTeamMember } from './create-team-member-service';

describe("create-team-member", () => {
  it("should be able to create a new Team Member", async () => {
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    
    const user = User.create({
      name: "Test",
      email: "Test@test.com",
      password: "test123",
    });

    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    if(team.isLeft() || user.isLeft())
      return;

    inMemoryTeamRepository.items.push(team.value);
    inMemoryUserRepository.items.push(user.value);

    const createTeamMember = new CreateTeamMember(
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository,
      inMemoryUserRepository
    );

    const newTeamMember = await createTeamMember.execute({
      user_id: user.value.id,
      team_id: team.value.id,
    });

    expect(newTeamMember).toBeTruthy();
  });

  it("should not be able to create a new Team Member without team_id", async () => {
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    
    const createTeamMember = new CreateTeamMember(
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository,
      inMemoryUserRepository
    );

    const user = User.create({
      name: "Test",
      email: "Test@test.com",
      password: "test123",
    });

    if(user.isLeft())
      return;

    const teamMemberOrError = await createTeamMember.execute({
      user_id: user.value.id,
      team_id: "",
    });

    expect(teamMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new Team Member without user_id", async () => {
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    
    const createTeamMember = new CreateTeamMember(
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository,
      inMemoryUserRepository
    );

    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    if(team.isLeft())
      return;

    const teamMemberOrError = await createTeamMember.execute({
      user_id: "",
      team_id: team.value.id,
    });

    expect(teamMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new Team Member with an invalid team_id", async () => {
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();

    const user = User.create({
      name: "Test",
      email: "Test@test.com",
      password: "test123",
    });

    if(user.isLeft())
      return;

    inMemoryUserRepository.items.push(user.value);

    const createTeamMember = new CreateTeamMember(
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository,
      inMemoryUserRepository
    );

    const teamMemberOrError = await createTeamMember.execute({
      user_id: user.value.id,
      team_id: "testId",
    });

    expect(teamMemberOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new Team Member with an invalid user_id", async () => {
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    
    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    if(team.isLeft())
      return;

    inMemoryTeamRepository.items.push(team.value);

    const createTeamMember = new CreateTeamMember(
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository,
      inMemoryUserRepository
    );

    const teamMemberOrError = await createTeamMember.execute({
      user_id: "testId",
      team_id: team.value.id,
    });

    expect(teamMemberOrError.isLeft()).toBe(true);
  });
})