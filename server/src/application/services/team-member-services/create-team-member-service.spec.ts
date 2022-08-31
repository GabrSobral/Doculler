import { Team } from '../../../domain/entities/Team';
import { User } from '../../../domain/entities/User';

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

    inMemoryTeamRepository.items.push(team);
    inMemoryUserRepository.items.push(user);

    const createTeamMember = new CreateTeamMember(
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository,
      inMemoryUserRepository
    );

    const newTeamMember = await createTeamMember.execute({
      user_id: user.id,
      team_id: team.id,
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

    await expect(createTeamMember.execute({
      user_id: user.id,
      team_id: "",
    })).rejects.toThrow();
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

    await expect(createTeamMember.execute({
      user_id: "",
      team_id: team.id,
    })).rejects.toThrow();
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

    inMemoryUserRepository.items.push(user);

    const createTeamMember = new CreateTeamMember(
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository,
      inMemoryUserRepository
    );

    await expect(createTeamMember.execute({
      user_id: user.id,
      team_id: "testId",
    })).rejects.toThrow();
  });

  it("should not be able to create a new Team Member with an invalid user_id", async () => {
    const inMemoryTeamMemberRepository = new InMemoryTeamMemberRepository();
    const inMemoryTeamRepository = new InMemoryTeamRepository();
    const inMemoryUserRepository = new InMemoryUserRepository();
    
    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });

    inMemoryTeamRepository.items.push(team);

    const createTeamMember = new CreateTeamMember(
      inMemoryTeamMemberRepository,
      inMemoryTeamRepository,
      inMemoryUserRepository
    );

    await expect(createTeamMember.execute({
      user_id: "testId",
      team_id: team.id,
    })).rejects.toThrow();
  });
})