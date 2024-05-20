import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { stdRes } from "../utils/global.utils";

type User = {
  username: string;
  password: string;
  role: "MD" | "GM" | "HR" | "OM" | "PM" | "SV" | "WR" | "CU" | "US";
  isBlocked: boolean;
};

const unAuthorize = (res: Response) => {
  res.status(401).send(stdRes(false, "Unauthorized request"));
};

export const authMiddleWare = (roles: ("MD" | "GM" | "HR" | "OM" | "PM" | "SV" | "WR" | "CU" | "US")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      unAuthorize(res);
      return;
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      unAuthorize(res);
      return;
    }

    const key = process.env.SIGN_KEY;

    if (!key) return;
    let payload: User;

    try {
      payload = verify(token, key) as User;
    } catch (error) {
      unAuthorize(res);
      return;
    }

    if (!payload) {
      unAuthorize(res);
      return;
    }

    if(payload.isBlocked){
      unAuthorize(res);
      return;
    }

    if (!roles.includes(payload.role)) {
      unAuthorize(res);
      return;
    }

    next();
  };
};
