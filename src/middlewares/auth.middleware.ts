import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
type User = {
  username: string;
  password: string;
  role: "user" | "admin";
};

export const authMiddleWare = (role: ("user" | "admin")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
      return res.status(401).send("Unauthorized request");

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).send("Unauthorized request");

    const key = process.env.SIGN_KEY;

    if (!key) return;
    let payload: User;

    try {
      payload = verify(token, key) as User;
    } catch (error) {
      return res.status(401).send("Unauthorized request");
    }

    if (!payload) return res.status(401).send("Unauthorized request");

    if (!role.includes(payload.role)) {
      return res.status(401).send("Unauthorized request");
    }

    next();
  };
};
