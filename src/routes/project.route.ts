import { Router } from "express";
import {getList,
    editProject,
    getProject,
    deleteProject,
    addProject, } from "../controllers/project.controller";
import { authMiddleWare } from "../middlewares/auth.middleware";

export const router = Router();

// ------------ Project api -------------
router.route("/add").post(addProject);
router.route("/list").post(getList);
//edit
router.route("/:id").put(editProject);
//delete
router.route("/:id").delete(deleteProject);
//get project
router.route("/:id").post(getProject);

// ------------- Material api -------------
router.route("/material/add")