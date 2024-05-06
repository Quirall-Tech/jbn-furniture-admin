import { Router } from "express";
import {addItem, itemList } from "../controllers/item.controller";
import { authMiddleWare } from "../middlewares/auth.middleware";

export const router = Router();

// ------------ Item api -------------
router.route("/add").post(addItem);
router.route("/list").post(itemList);
// //edit
// router.route("/:id").put(editProject);
// //delete
// router.route("/:id").delete(deleteProject);
// //get project
// router.route("/:id").post(getProject);
