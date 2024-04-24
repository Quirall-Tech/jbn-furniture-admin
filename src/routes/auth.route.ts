import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller";
import { authMiddleWare } from "../middlewares/auth.middleware";

export const router = Router();

router.route("/login").post(loginController);
router.route("/register").post(registerController);

// Tobe removed
router.route("/sample").get(authMiddleWare(["admin"]), (req, res) => {
  res.send("success");
});
