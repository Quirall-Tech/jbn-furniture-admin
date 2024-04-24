import { Request, Response } from "express";
import { User } from "../db/models/User";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { stdRes } from "../utils/global.utils";

export interface IRegisterBody {
  username?: string;
  password?: string;
}
export const registerController = async (req: Request, res: Response) => {
  const body = req.body as IRegisterBody;

  if (!body) return res.status(500).send(stdRes(false, `Can't find body\n`));
  if (!body.username)
    return res.status(400).send(stdRes(false, `Username is required\n`));
  if (!body.password)
    return res.status(400).send(stdRes(false, `Password is required\n`));

  const user = new User({ username: body.username, password: body.password });

  const err = user.validateSync();

  if (!err) {
    try {
      await user.save();
      res.status(200).send(stdRes(false, "Successfully registered"));
    } catch (e: any) {
      if (e?.message?.indexOf("duplicate key error") !== -1) {
        res.status(403).send(stdRes(false, "User already exists"));
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

  res
    .status(400)
    .json(stdRes(false, { message: "Registration failed", errors }));
};

export const loginController = async (req: Request, res: Response) => {
  const body = req.body as IRegisterBody;

  if (!body) return res.status(500).send(stdRes(false, `Can't find body\n`));
  if (!body.username)
    return res.status(400).send(stdRes(false, `Username is required\n`));
  if (!body.password)
    return res.status(400).send(stdRes(false, `Password is required\n`));

  const user = await User.findOne({ username: body.username });

  if (!user) {
    return res
      .status(404)
      .json(stdRes(false, "Username or password is incorrect"));
  }

  const passMatch = await compare(body.password, user.password);

  if (!passMatch) {
    return res
      .status(401)
      .json(stdRes(false, "Username or password is incorrect"));
  }

  const key = process.env.SIGN_KEY;

  if (!key) return;

  const token = sign(user.toObject(), key);

  res.status(200).send(stdRes(true, { token }));
};
