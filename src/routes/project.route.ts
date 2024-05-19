import { Router } from "express";
import {
  getList,
  getProject,
  addProject,
  drawingFileUpload,
  materialUpload,
  orderConfirmation,
  productionUpdates,
  arrivalEstimate,
  deliveryUpdate,
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
router.route("/arrival/:id").post(arrivalEstimate);
router.route("/production/:id").post(productionUpdates);
router.route("/delivery/:id").post(deliveryUpdate);
router.route("/installation/:id").post(productionUpdates);
//to be implimented
router.route("/awaiting-service/:id").post(productionUpdates);
router.route("/service/:id").post(productionUpdates);
router.route("/close/:id").post(productionUpdates);
router.route("/cancel/:id").post(productionUpdates);
//arrivalEstimate
//delivery
//installation
//awaiting service
//service
//close
//cancel

//get project
router.route("/:id").post(getProject);


// ------------- Material api -------------
router.route("/material/add");
