import { Router } from "express";
import { authMiddleWare } from "../middlewares/auth.middleware";
import { blockUser, unBlockUser, updateUser, userList } from "../controllers/user.controller";

export const router = Router();

router.route("/list").post(userList);
router.route("/:id").put(updateUser);
router.route("/block/:id").get(blockUser);
router.route("/unblock/:id").get(unBlockUser);


