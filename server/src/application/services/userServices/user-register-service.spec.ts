import { JsonWebToken } from "../../../../src/adapters/json-web-token/json-web-token-jwt-adapter";
import { InMemoryUserRepository } from "../../../../tests/repositories/in-memory-user-repository"
import { UserRegisterService } from "./user-register-service";

describe("user-register-service", () => {
  const jsonWebTokenHandler = new JsonWebToken();
  
  it("should be able to register a new user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userRegisterService = new UserRegisterService(
      inMemoryUserRepository,
      jsonWebTokenHandler
    );

    const newUser = await userRegisterService.execute({
      name: "User test",
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    });

    await inMemoryUserRepository.register({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password
    });
    
    const userInMemory = await inMemoryUserRepository.findByEmail(newUser.email);

    expect(newUser.token).toBeTruthy();
    expect(userInMemory).toBeTruthy();
    expect(newUser.password).toEqual(userInMemory?.password);
  });

  it("should not be able to register an already existing user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userRegisterService = new UserRegisterService(
      inMemoryUserRepository,
      jsonWebTokenHandler
    );

    await userRegisterService.execute({
      name: "User test",
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    });

    await expect(userRegisterService.execute({
      name: "User test",
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    })).rejects.toThrow();
  });

  it("should not be able to register an user without name", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userRegisterService = new UserRegisterService(
      inMemoryUserRepository,
      jsonWebTokenHandler
    );

    await expect(userRegisterService.execute({
      name: "",
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    })).rejects.toThrow();
  });

  it("should not be able to register an user without password", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userRegisterService = new UserRegisterService(
      inMemoryUserRepository,
      jsonWebTokenHandler
    );

    await expect(userRegisterService.execute({
      name: "User test",
      email: "UserTest@test.com",
      password: ""
    })).rejects.toThrow();
  });
})