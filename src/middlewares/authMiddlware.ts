import { NextFunction, Request, Response } from "express";
import responseHandler from "../services/responseHandler";
import { JWT_SECRET } from "../secrets";
import jwt from "jsonwebtoken";
import { prismaClient } from "..";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.body.token || req.query.token || req.headers["token"] || req.headers["authorization"];
    if (!token) {
      return responseHandler.unauthorized(res, "Token required");
    }
    let headerArr = token?.split(" ");
    if (headerArr.length > 1) token = headerArr[1];
    else token = headerArr[0];
    try {
      let checkUser = await prismaClient.user.findMany({ where: { token: token } });
      if (checkUser?.length < 1) {
        return responseHandler.unauthorized(res, "Invalid token");
      }

      jwt.verify(token, JWT_SECRET);
      return next();
    } catch (err) {
      return responseHandler.unauthorized(res, "Invalid token");
    }
  } catch (err) {
    return responseHandler.error(res, err);
  }
};
