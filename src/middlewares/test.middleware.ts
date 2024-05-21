import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { stdRes } from "../utils/global.utils";

type User = {
  username: string;
  password: string;
  role: "user" | "admin";
};

export const authMiddleWare = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("req.files", req.files);
    console.log("req.file", req.file);
    console.log("req.body", req.body);
    console.log("req.params", req.params);

    next();
  };
};
