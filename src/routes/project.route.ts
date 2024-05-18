import { Router } from "express";
import {
  getList,
  getProject,
  addProject,
  drawingFileUpload,
  materialUpload,
  orderConfirmation,
  productionUpdates,
} from "../controllers/project.controller";
import { authMiddleWare } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

export const router = Router();

// ------------ Project api -------------
router.route("/add").post(addProject);
router.route("/list").post(getList);
router.route("/drawing-upload/:id").post(upload.single('file'),drawingFileUpload);
router.route("/material-upload/:id").post(materialUpload);
router.route("/confirmation/:id").post(orderConfirmation);
router.route("/production/:id").post(productionUpdates);
//get project
router.route("/:id").post(getProject);


// ------------- Material api -------------
router.route("/material/add");
