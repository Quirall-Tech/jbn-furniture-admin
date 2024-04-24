import { Router } from "express";
import { registerController } from "../controllers/auth.controller";

export const router = Router();

router.route("/login").post();
router.route("/register").post(registerController);
