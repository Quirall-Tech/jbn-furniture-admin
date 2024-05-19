import { Router } from "express";
import {addItem, deletedItem, getItem, itemList, updateItem } from "../controllers/item.controller";
import { authMiddleWare } from "../middlewares/auth.middleware";

export const router = Router();

// ------------ Item api -------------
router.route("/add").post(addItem);
router.route("/list").post(itemList);
// //edit
router.route("/:id").put(updateItem);
// //delete
router.route("/:id").delete(deletedItem);
// //get 
router.route("/:id").get(getItem);
