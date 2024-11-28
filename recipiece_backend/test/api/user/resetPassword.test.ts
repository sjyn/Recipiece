import { User } from "@prisma/client";
import { UserValidationTokenTypes } from "../../../src/util/constant";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { hashPassword, verifyPassword } from "../../../src/util/password";
import { randomUUID } from "crypto";

describe("Reset Password", () => {
  let user: User;
  let bearerToken: string;

  beforeEach(async () => {
    const userAndToken = await fixtures.createUserAndToken();
    user = userAndToken[0];
    bearerToken = userAndToken[1];
  });

  it("should set the user credentials to the new password for a user", async () => {
    const createdToken = await testPrisma.userValidationToken.create({
      data: {
        user_id: user.id,
        purpose: UserValidationTokenTypes.FORGOT_PASSWORD.purpose,
      },
    });

    const response = await request(server).post("/user/reset-password").send({
      password: "Pass1234!@#$",
      token: createdToken.id,
    });

    expect(response.statusCode).toEqual(StatusCodes.OK);

    const credentials = await testPrisma.userCredentials.findFirst({
      where: {
        user_id: user.id,
      },
    });
    expect(credentials).toBeTruthy();
    const passwordsMatch = await verifyPassword("Pass1234!@#$", credentials!.password_hash);
    expect(passwordsMatch).toBe(true);
  });

  it("should not accept an invalid token", async () => {
    const response = await request(server).post("/user/reset-password").send({
      password: "Pass1234!@#$",
      token: randomUUID().toString(),
    });
    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
  });

  it("should not allow the same token to be used twice", async () => {
    const createdToken = await testPrisma.userValidationToken.create({
      data: {
        user_id: user.id,
        purpose: UserValidationTokenTypes.FORGOT_PASSWORD.purpose,
      },
    });

    const response = await request(server).post("/user/reset-password").send({
      password: "Pass1234!@#$",
      token: createdToken.id,
    });

    expect(response.statusCode).toEqual(StatusCodes.OK);

    const secondResponse = await request(server).post("/user/reset-password").send({
      password: "AnotherPass1234!@#$",
      token: createdToken.id,
    });

    expect(secondResponse.statusCode).toEqual(StatusCodes.NOT_FOUND);
  });
});
