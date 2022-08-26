import { JsonWebToken } from "./json-web-token-jwt-adapter"

describe("json-web-token-jwt-adapter", () => {
  it("should be able to generate a new jwt token", () => {
    const jsonWebTokenHandler = new JsonWebToken();

    const token = jsonWebTokenHandler.sign(
      { email: "UserTest@test.com" }, 
      60 * 60 // 1 hour
    );

    expect(token).toBeTruthy();
  })
})