import { Router } from "express";
import { addItem, deletedItem, getItem, itemList, updateItem } from "../controllers/item.controller";
import { authMiddleWare } from "../middlewares/auth.middleware";

export const router = Router();
const ADMIN_ACCESS: ("MD" | "GM" | "HR" | "OM" | "PM" | "SV" | "WR" | "CU" | "US")[] = ['MD', 'GM', 'HR'];
// ------------ Item api -------------
router.route("/add").post(addItem);
router.route("/list").post(itemList);
router.route("/:id").put(updateItem);
router.route("/:id").delete(deletedItem);
router.route("/:id").get(getItem);