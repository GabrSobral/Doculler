import { UserLoginService } from "./user-login-service"
import { InMemoryUserRepository } from '../../../../tests/repositories/in-memory-user-repository';
import { UserRegisterService } from "./user-register-service";
import { JsonWebToken } from "../../../adapters/json-web-token/json-web-token-jwt-adapter";

describe("user-login-service", () => {
  const inMemoryUserRepository = new InMemoryUserRepository();
  const jsonWebTokenHandler = new JsonWebToken();

  const userRegisterService = new UserRegisterService(
    inMemoryUserRepository,
    jsonWebTokenHandler
  );

  const userLoginService = new UserLoginService(
    inMemoryUserRepository,
    jsonWebTokenHandler
  );

  beforeAll(async () => {
    await userRegisterService.execute({
      name: "User test",
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    });
  })

  it("should be able to authenticate the user", async () => {
    const loggedUser = await userLoginService.execute({
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    });

    expect(loggedUser).toBeTruthy();
    expect(loggedUser.token).toBeTruthy();

    const userInMemory = await inMemoryUserRepository.findByEmail(loggedUser.email);

    expect(loggedUser.password).toEqual(userInMemory?.password);
  });

  it("should not be able to authenticate the user without email", async () => {
    await expect(userLoginService.execute({
      email: "",
      password: "791$X5zfYI!y"
    })).rejects.toThrow();
  });

  it("should not be able to authenticate the user without password", async () => {
    await expect(userLoginService.execute({
      email: "UserTest@test.com",
      password: ""
    })).rejects.toThrow();
  });

  it("should not be able to authenticate an invalid user", async () => {
    await expect(userLoginService.execute({
      email: "UserTestTest@test.com",
      password: "791$X5zfYI!y"
    })).rejects.toThrow();
  });

  it("should not be able to authenticate an valid user but invalid password", async () => {
    await expect(userLoginService.execute({
      email: "UserTest@test.com",
      password: "791$X5zfYI!yTest"
    })).rejects.toThrow();
  });
})