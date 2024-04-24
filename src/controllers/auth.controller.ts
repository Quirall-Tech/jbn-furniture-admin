import { Request, Response } from "express";
import { User } from "../db/models/User";

export interface IRegisterBody {
  username?: string;
  password?: string;
}
export const registerController = async (req: Request, res: Response) => {
  const body = req.body as IRegisterBody;

  if (!body) return res.status(500).send(`Can't find body\n`);
  if (!body.username) return res.status(400).send(`Username is required\n`);
  if (!body.password) return res.status(400).send(`Password is required\n`);

  const user = new User({ username: body.username, password: body.password });

  const err = user.validateSync();

  if (!err) {
    try {
      await user.save();
      res.status(200).send("Successfully registered");
    } catch (e: any) {
      if (e?.message?.indexOf("duplicate key error") !== -1) {
        res.status(403).send("User already exists");
      }
    }
    return;
  }

  const errors: Record<string, string> = {};
  if (err.errors["username"]?.message) {
    errors.username = err.errors["username"].message;
  }

  if (err.errors["password"]?.message) {
    errors.password = err.errors["password"].message;
  }

  res.status(400).json({ message: "Registration failed", errors });
};
