import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";
import { authMiddleWare } from "../middlewares/auth.middleware";

export const router = Router();

router.route("/login").post(handleLogin);
router.route("/register").post(handleRegister);

// Tobe removed
router.route("/sample").get(authMiddleWare(["US"]), (req, res) => {
  res.json({ success: true });
});
