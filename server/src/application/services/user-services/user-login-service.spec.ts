import { UserLoginService } from "./user-login-service"
import { UserRegisterService } from "./user-register-service";

import { JsonWebToken } from "../../../adapters/json-web-token/json-web-token-jwt-adapter";

import { InMemoryUserRepository } from '../../../../tests/repositories/in-memory-user-repository';

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

    if(loggedUser.isLeft())
      return;

    expect(loggedUser.value.token).toBeTruthy();
    
    const userInMemory = await inMemoryUserRepository.findByEmail(loggedUser.value.email.value);

    expect(loggedUser.value.password).toEqual(userInMemory?.password);
  });

  it("should not be able to authenticate the user without email", async () => {
    const user = await userLoginService.execute({
      email: "",
      password: "791$X5zfYI!y"
    });
    
    expect(user.isLeft()).toBe(true);
  });

  it("should not be able to authenticate the user without password", async () => {
    const user = await userLoginService.execute({
      email: "UserTest@test.com",
      password: ""
    });

    expect(user.isLeft()).toBe(true);
  });

  it("should not be able to authenticate an invalid user", async () => {
    const user = await userLoginService.execute({
      email: "UserTestTest@test.com",
      password: "791$X5zfYI!y"
    });

    expect(user.isLeft()).toBe(true);
  });

  it("should not be able to authenticate an valid user but invalid password", async () => {
    const user = await userLoginService.execute({
      email: "UserTest@test.com",
      password: "791$X5zfYI!yTest"
    });

    expect(user.isLeft()).toBe(true);
  });
})