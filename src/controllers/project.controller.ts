import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";

const projectService: ProjectService = new ProjectService();

export const addProject = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    await projectService.createProject(data);
    res
      .status(200)
      .json({ status: "success", message: "Project Created Successfully" });
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const getList = async (req: Request, res: Response) => {
  try {
    const result = await projectService.projectList();
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};


export const getProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const project = await projectService.getProjectById(projectId);
    res.status(200).json({ status: "success", data: project });
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const drawingFileUpload = async (req: Request, res: Response) => {
  try {
    if (req?.file) {
      const data: any = req?.file;
      const url = data.location;
      console.log(req.body,req.params,req.file, "req body");
      await projectService.drawingUpdate({
        id: req.params.id,
        file: [
          { url, date: Date.now() },
          //if multiple file need to add to this array
        ],
        isApproved:false,
      });
      res.status(200).json({ status: "success", data: { url } });
    }else{
      res.status(400).json({ status: "failed", messages: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
export const materialUpload = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    data.id = projectId;
    const project = await projectService.materialEstimate(data);
    res.status(200).json({ status: "success", data: project });
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
export const orderConfirmation = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    data.id = projectId;
    const project = await projectService.orderConfirmation(data);
    res.status(200).json({ status: "success", data: project });
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
export const productionUpdates = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    data.id = projectId;
    const project = await projectService.productionUpdation(data);
    res.status(200).json({ status: "success", data: project });
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
