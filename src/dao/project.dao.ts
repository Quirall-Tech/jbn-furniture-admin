import { Client } from "../db/models/Client";
import { Project } from "../db/models/Project";


export const addProject = async (data: any) => {
  try {
    const project = await Project.create(data);
    return project;
  } catch (err) {
    console.log("Error occured while adding Project");
    throw err;
  }
};
export const updateProject = async (id: any, data: any) => {
  try {
    const { client, projectTotal, notes, furnitureList } = data;
    const project = await Project.findOneAndUpdate({ _id: id }, { client, projectTotal, notes, furnitureList: [...furnitureList] }, { new: true });
    return project

  } catch (err) {
    console.log("Error occured while updating project");
    throw err
  }
}
export const getProject = async (id: any) => {
  try {
    const project = await Project.findOne({ _id: id }).populate(['client', 'material_details', 'production_details']).populate({
      path: 'material_details',
      populate: {
        path: 'item',
        populate: {
          path: 'item_id'
        }
      }
    });;
    return project;
  } catch (err) {
    console.log("Error occured while fetching Project data");
    throw err;
  }
};
export const addMaterialIdToProject = async (id: any, materialId: object) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: id },
      { material_details: materialId },
      { returnDocument: "after" }
    );
    return project;
  } catch (err) {
    console.log("Error occured while adding material id to Project");
    throw err;
  }
};
export const addProductionIdToProject = async (id: any, productionId: object) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: id },
      { production_details: productionId },
      { returnDocument: "after" }
    );
    return project;
  } catch (err) {
    console.log("Error occured while adding production id to Project");
    throw err;
  }
};
export const addDrawingFile = async (id: any, file: [{ url: String; notes: String; date: Date }]) => {
  try {
    return await Project.findOneAndUpdate(
      { _id: id }, // Filter to find the project by ID
      {
        $push: {
          'attachments.drawingFile': {
            $each: [...file], // Use $each to push multiple attachments
          }
        },
      },
      {
        new: true // Return the modified document
      }
    )
  } catch (err) {
    console.log("Error occured while adding drawing file to Project", err);
    throw err;
  }
};
export const addMaterialEstimateFile = async (id: any, file: [{ url: String; notes: String; date: Date }]) => {
  try {
    return await Project.findOneAndUpdate(
      { _id: id }, // Filter to find the project by ID
      {
        $push: {
          'attachments.invoiceFile': {
            $each: [...file], // Use $each to push multiple attachments
          }
        },
      },
      {
        new: true // Return the modified document
      }
    )
  } catch (err) {
    console.log("Error occured while adding material estimate file to Project");
    throw err;
  }
};
export const addInstallationFile = async (id: any, file: [{ url: String; notes: String; date: Date }]) => {
  try {
    return await Project.findOneAndUpdate(
      { _id: id }, // Filter to find the project by ID
      {
        $push: {
          'attachments.installationFile': {
            $each: [...file], // Use $each to push multiple attachments
          }
        },
      },
      {
        new: true // Return the modified document
      }
    )
  } catch (err) {
    console.log("Error occured while adding installation file to Project");
    throw err;
  }
};
export const addClosingReportFile = async (id: any, file: [{ url: String; notes: String; date: Date }]) => {
  try {
    return await Project.findOneAndUpdate(
      { _id: id }, // Filter to find the project by ID
      {
        $push: {
          'attachments.closingReportFile': {
            $each: [...file], // Use $each to push multiple attachments
          }
        },
      },
      {
        new: true // Return the modified document
      }
    )
  } catch (err) {
    console.log("Error occured while adding closing report file to Project");
    throw err;
  }
};
export const addServiceReportFile = async (id: any, file: [{ url: String; notes: String; date: Date }]) => {
  try {
    return await Project.findOneAndUpdate(
      { _id: id }, // Filter to find the project by ID
      {
        $push: {
          'attachments.serviceReportFile': {
            $each: [...file], // Use $each to push multiple attachments
          }
        },
      },
      {
        new: true // Return the modified document
      }
    )
  } catch (err) {
    console.log("Error occured while adding service report file to Project");
    throw err;
  }
};
export const listProject = async () => {
  try {
    const itemList = await Project.find().sort({createdAt:-1}).populate(['client', 'material_details', 'production_details']).populate({
      path: 'material_details',
      populate: {
        path: 'item',
        populate: {
          path: 'item_id'
        }
      }
    });
    return itemList;
  } catch (err) {
    console.log("Error occured while find items");
    throw err;
  }
};
export const deleteFile = async (projectId: any, fileId: any, key: any) => {
  try {
    if (key === "close") {
      return await Project.findByIdAndUpdate(projectId, { $pull: { "attachments.closingReportFile": { _id: fileId } } }, { multi: false, new: true });
    } else if (key === "service") {
      return await Project.findByIdAndUpdate(projectId, { $pull: { "attachments.serviceReportFile": { _id: fileId } } }, { multi: false, new: true });
    } else if (key === "installation") {
      return await Project.findByIdAndUpdate(projectId, { $pull: { "attachments.installationFile": { _id: fileId } } }, { multi: false, new: true });
    } else if (key === "drawing") {
      return await Project.findByIdAndUpdate(projectId, { $pull: { "attachments.drawingFile": { _id: fileId } } }, { multi: false, new: true });
    } else if (key === "invoice") {
      return await Project.findByIdAndUpdate(projectId, { $pull: { "attachments.invoiceFile": { _id: fileId } } }, { multi: false, new: true });
    } else {
      return {
        error: {
          message: "No proper data found"
        }
      }
    }
  } catch (err) {
    console.log("Error occured while find items");
    throw err;
  }
};
export const updateStatus = async (id: any, statusCode: any) => {
  try {
    return await Project.findByIdAndUpdate(id, { orderStatus: statusCode });
  } catch (err) {
    console.log("Error occured while find items");
    throw err;
  }
}
