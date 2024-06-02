import { Router } from "express";
import { addEmployee, deleteEmployee, employeeList, getEmployee, updateEmployee } from "../controllers/emp.controller";
import { authMiddleWare } from "../middlewares/auth.middleware";

export const router = Router();
const ADMIN_ACCESS: ("MD" | "GM" | "HR" | "OM" | "PM" | "SV" | "WR" | "CU" | "US")[] = ['MD', 'GM', 'HR'];
// ------------ Employee api -------------
router.route("/add").post(addEmployee);
router.route("/list").post(employeeList);
router.route("/:id").put(updateEmployee);
router.route("/:id").delete(deleteEmployee);
router.route("/:id").get(getEmployee);