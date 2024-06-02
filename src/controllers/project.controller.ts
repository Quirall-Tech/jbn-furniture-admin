import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";

const projectService: ProjectService = new ProjectService();

export const addProject = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result: any = await projectService.createProject(data);

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    data.id = projectId;
    const result: any = await projectService.orderEnteringUpdate(data);

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
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
    if (req?.files) {
      const projectId = req.params.id;
      const data: any = req.body;
      const fileData: any = req?.files;

      const files = fileData.map((file: any) => {
        return { url: file.location, notes: data?.notes, date: Date.now() };
      })

      const result: any = await projectService.drawingUpdate({
        id: projectId,
        //if multiple file need to add to this array
        file: [...files],
        isApproved: data.isApproved,
      });

      if (result?.error) {
        res.status(400).json({ status: "failed", message: result.error.message });
      } else {
        res.status(200).json({ status: "success", data: result });
      }
    } else {
      res.status(400).json({ status: "failed", messages: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
//done
export const materialUpload = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    data.id = projectId;
    const result = await projectService.materialEstimate(data);
    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
//done
export const orderConfirmation = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    data.id = projectId;
    const result: any = await projectService.orderConfirmation(data);
    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
// done
export const productionUpdates = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    data.id = projectId;
    const result: any = await projectService.productionUpdation(data);
    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
//done
export const arrivalEstimate = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    data.id = projectId;
    const result: any = await projectService.arrivalEstimate(data);
    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
//done
export const deliveryUpdate = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    data.id = projectId;
    const result: any = await projectService.deliveryUpdation(data);
    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
export const installationUpdate = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    data.id = projectId;
    const result: any = await projectService.installationUpdate(data);
    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
export const awaitingService = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    data.id = projectId;
    const project = await projectService.awaitingServiceUpdate(data);
    res.status(200).json({ status: "success", data: project });
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
export const serviceUpdate = async (req: Request, res: Response) => {
  try {
    if (req?.files) {
      const projectId = req.params.id;
      const data: any = req.body;
      const fileData: any = req?.files;
      const files = fileData.map((file: any) => {
        return { url: file.location, date: Date.now() };
      })

      await projectService.serviceUpdate({
        id: projectId,
        //if multiple file need to add to this array
        file: [...files],
        isApproved: data.isApproved,
      });
      res.status(200).json({ status: "success", data: { files } });
    } else {
      res.status(400).json({ status: "failed", messages: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
export const closingUpdate = async (req: Request, res: Response) => {
  try {
    if (req?.files) {
      const projectId = req.params.id;
      const data: any = req.body;
      const fileData: any = req?.files;
      const files = fileData.map((file: any) => {
        return { url: file.location, date: Date.now() };
      })

      await projectService.closingUpdate({
        id: projectId,
        //if multiple file need to add to this array
        file: [...files],
        isApproved: data.isApproved,
      });
      res.status(200).json({ status: "success", data: { files } });
    } else {
      res.status(400).json({ status: "failed", messages: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
export const cancellation = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    // const data = req.body;
    // data.id = projectId;
    const project = await projectService.cancelOrder(projectId);
    res.status(200).json({ status: "success", data: project });
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const fileUpload = async (req: Request, res: Response) => {
  try {
    if (req?.files && req.body.key) {
      //project id
      const projectId = req.params.id;
      const fileData: any = req?.files;
      const { key, notes } = req.body

      const files = fileData.map((file: any) => {
        return { url: file.location, notes, date: Date.now() };
      })

      const result: any = await projectService.fileUpload({
        id: projectId,
        file: [...files],
        key
      });

      if (result?.error) {
        res.status(400).json({ status: "failed", message: result.error.message });
      } else {
        res.status(200).json({ status: "success", data: result });
      }
    } else {
      res.status(400).json({ status: "failed", messages: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
      const projectId = req.params.id;
      const {fileId,key} = req.body;
      const result: any = await projectService.deleteFile(projectId,fileId,key);

      if (result?.error) {
        res.status(400).json({ status: "failed", message: result.error.message });
      } else {
        res.status(200).json({ status: "success", data: result });
      }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};