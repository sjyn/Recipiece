import { Request, Response } from "express";
import { ApiResponse } from "../../types";
import { User } from "@prisma/client";
import { prisma } from "../../database";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../../util/password";

export const createUser = async (req: Request, res: Response) => {
  const [responseCode, response] = await runCreateUser(
    req.body.username,
    req.body.password
  );
  res.status(responseCode).send(response);
};

export const runCreateUser = async (
  username?: string,
  password?: string
): ApiResponse<User> => {
  if (!username || !password) {
    return [
      StatusCodes.BAD_REQUEST,
      {
        message: "Missing username or password",
      },
    ];
  }

  try {
    const hashedPassword = await hashPassword(password);
    if (!hashPassword) {
      return [
        StatusCodes.INTERNAL_SERVER_ERROR,
        {
          message: "Unable to create account",
        },
      ];
    }

    const insertedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: username,
        },
      });
      await tx.userCredentials.create({
        data: {
          user_id: user.id,
          password_hash: hashedPassword!,
        },
      });
      return user;
    });

    return [StatusCodes.CREATED, insertedUser];
  } catch (err) {
    console.error(err);
    return [
      StatusCodes.BAD_REQUEST,
      {
        message: "Unable to create account",
      },
    ];
  }
};