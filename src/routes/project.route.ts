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
  installationUpdate,
  awaitingService,
  serviceUpdate,
  closingUpdate,
  cancellation,
  fileUpload,
  deleteFile,
} from "../controllers/project.controller";
import { authMiddleWare } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

export const router = Router();

// ------------ Project api -------------
router.route("/add").post(addProject);
router.route("/list").post(getList);
router.route("/drawing-upload/:id").post(upload.array('drawing'), drawingFileUpload);
router.route("/material-upload/:id").post(materialUpload);
router.route("/confirmation/:id").post(orderConfirmation);
router.route("/arrival/:id").post(arrivalEstimate);
router.route("/production/:id").post(productionUpdates);
router.route("/delivery/:id").post(deliveryUpdate);
router.route("/installation/:id").post(installationUpdate);
router.route("/awaiting-service/:id").post(awaitingService);
router.route("/service/:id").post(serviceUpdate);
router.route("/close/:id").post(closingUpdate);
router.route("/cancel/:id").post(cancellation);
//file upload
router.route("/fileUpload/:id").post(upload.array('file'),fileUpload)
//file delete
router.route("/deleteFile/:id").post(deleteFile)

//get project
router.route("/:id").post(getProject);


