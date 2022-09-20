import { JsonWebToken } from "../../../adapters/json-web-token/json-web-token-jwt-adapter";
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
      email: "gsobral@test.com",
      password: "791$X5zfYI!y"
    });

    if(newUser.isLeft())
      return;

    const userInMemory = await inMemoryUserRepository.findByEmail(newUser.value.email.value);

    expect(newUser.value.token).toBeTruthy();
    expect(userInMemory).toBeTruthy();
    expect(newUser.value.password).toEqual(userInMemory?.password);
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

    const userOrError = await userRegisterService.execute({
      name: "User test",
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    });

    expect(userOrError.isLeft()).toBe(true);
  });

  it("should not be able to register an user without name", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userRegisterService = new UserRegisterService(
      inMemoryUserRepository,
      jsonWebTokenHandler
    );

    const userOrError = await userRegisterService.execute({
      name: "",
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    });

    expect(userOrError.isLeft()).toBe(true);
  });

  it("should not be able to register an user without password", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userRegisterService = new UserRegisterService(
      inMemoryUserRepository,
      jsonWebTokenHandler
    );
    
    const userOrError = await userRegisterService.execute({
      name: "User test",
      email: "UserTest@test.com",
      password: ""
    });

    expect(userOrError.isLeft()).toBe(true);
  });

  it("should not be able to register an invalid user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userRegisterService = new UserRegisterService(
      inMemoryUserRepository,
      jsonWebTokenHandler
    );
    
    const userOrError = await userRegisterService.execute({
      name: "User test",
      email: "#$% UserTest@test.com",
      password: "791$X5zfYI!y"
    });

    expect(userOrError.isLeft()).toBe(true);
  });
})