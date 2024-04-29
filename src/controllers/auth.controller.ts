import { Request, Response } from "express";
import { User } from "../db/models/User";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { stdRes } from "../utils/global.utils";

export interface IRegisterBody {
  username?: string;
  password?: string;
}
export const handleRegister = async (req: Request, res: Response) => {
  const body = req.body as IRegisterBody;

  if (!body) return res.status(500).json(stdRes(false, `Can't find body`));
  if (!body.username)
    return res.status(400).json(stdRes(false, `Username is required`));
  if (!body.password)
    return res.status(400).json(stdRes(false, `Password is required`));

  const user = new User({ username: body.username, password: body.password });

  const err = user.validateSync();

  if (err) {
    const errors: Record<string, string> = {};

    for (const [key, val] of Object.entries(err.errors)) {
      errors[key] = val.message;
    }

    return res
      .status(400)
      .json(stdRes(false, { message: "Registration failed", errors }));
  }

  try {
    await user.save();
    res.status(200).json(stdRes(true, "Successfully registered"));
  } catch (e: any) {
    if (e?.message?.indexOf("duplicate key error") !== -1) {
      res.status(403).json(stdRes(false, "User already exists"));
    }
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  const body = req.body as IRegisterBody;

  if (!body) return res.status(500).json(stdRes(false, `Can't find body`));
  if (!body.username)
    return res.status(400).json(stdRes(false, `Username is required`));
  if (!body.password)
    return res.status(400).json(stdRes(false, `Password is required`));

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

  res.status(200).json(stdRes(true, { token }));
};
