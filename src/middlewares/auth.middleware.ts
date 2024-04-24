import { NextFunction, Request, Response } from "express";

export const authMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};
