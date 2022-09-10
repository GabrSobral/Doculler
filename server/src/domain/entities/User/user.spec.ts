import { User } from "./User"

describe("User", () => {
  it("should be able to create a valid User instance", () => {
    const user = User.create({
      name: "User Test",
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    });

    expect(user.isRight()).toBe(true);
    
    if(user.isRight()) {
      expect(user.value.name).toBeTruthy();
      expect(user.value.email).toBeTruthy();
      expect(user.value.password).toBeTruthy();
      expect(user.value.id).toBeTruthy();
      expect(user.value.created_at).toBeTruthy();
      expect(user.value.updated_at).toBeTruthy();
    }
  });

  it("should not be able to create a User with a name with less than 2 letters", () => {
    expect(User.create({
      name: "U",
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    }).isLeft()).toBe(true);
  });

  it("should not be able to create a User without name", () => {
    expect(User.create({
      name: "",
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    }).isLeft()).toBe(true);
  });

  it("should not be able to create a User with a name greater than 256 characters", () => {
    expect(User.create({
      name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      email: "UserTest@test.com",
      password: "791$X5zfYI!y"
    }).isLeft()).toBe(true);
  });
})