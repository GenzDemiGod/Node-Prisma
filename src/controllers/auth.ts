import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import responseHandler from "../services/responseHandler";
import { loginSchemaType, signupSchemaType } from "../schema/authSchema";

export const signup = async (req: Request<{}, {}, signupSchemaType>, res: Response) => {
  try {
    let { name, email, password } = req.body;
    let checkUserExist = await prismaClient.user.findFirst({
      where: { email },
    });
    if (checkUserExist) {
      return responseHandler.validationError(res, "User already exists.");
    }
    let insertUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
        token: "",
      },
    });
    return responseHandler.success(res, "Signup success", insertUser);
  } catch (error) {
    return responseHandler.error(res, error);
  }
};

export const login = async (req: Request<{},{},loginSchemaType>, res: Response) => {
  try {
    let { email, password } = req.body;

    let checkUserExist = await prismaClient.user.findFirst({
      where: { email },
      select: { password: true,id:true },
    });
    if (!checkUserExist) {
      return responseHandler.validationError(res, "User does not exists.");
    }
    const userPassword = checkUserExist?.password;
    if (!userPassword || !compareSync(password, userPassword)) {
      return responseHandler.validationError(res, "Incorrect password");
    }

    let token = jwt.sign({ email }, JWT_SECRET);
     // Save token in the database
     await prismaClient.user.update({
      where: { id: checkUserExist.id },
      data: { token },
    });
    // Exclude password from the user object before sending response
    const { password: _, ...userWithoutPassword } = checkUserExist;

    // Send user details (without password) and token
    return responseHandler.success(res, "Signup success", { user: userWithoutPassword });
  } catch (error) {
    return responseHandler.error(res, error);
  }
};
