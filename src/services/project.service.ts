import { Client } from "../db/models/Client";
import { Project } from "../db/models/Project";
import {
  addDrawingFile,
  addMaterialIdToProject,
  addProductionIdToProject,
  addProject,
  getProject,
  listProject,
  updateStatus,
} from "../dao/project.dao";
import { Material } from "../db/models/Material";
import mongoose, { Error } from "mongoose";
import { Production } from "../db/models/Production";
import { Item } from "../db/models/Item";

export class ProjectService {
  //create new project
  createProject = async (data: any) => {
    try {
      const { client, notes, description } = data;
      const checkClient = await Client.findOne({ mob: client.mob });
      if (checkClient) {
        return await addProject({
          client: checkClient._id,
          notes,
          description,
        });
      } else {
        const newClient = await Client.create(client);
        return await addProject({ client: newClient._id, notes, description });
      }
    } catch (err) {
      console.log("Error occured while creating Project");
      throw err;
    }
  };
  //project listing
  projectList = async () => {
    try {
      return await listProject();
    } catch (err) {
      console.log("Error occured while getting project list");
      throw err;
    }
  };
  //one project details
  getProjectById = async (id: any) => {
    try {
      return await getProject(id);
    } catch (err) {
      console.log("Error occured while getting project list");
      throw err;
    }
  };
  //order entering complete (orderStatus=1)
  orderEnteringComplete = async (data: any) => {
    try {
    } catch (err) {
      console.log("Error occured while entering order");
      throw err;
    }
  };
  //drawing update and complete (orderStatus=2)
  drawingUpdate = async (data: any) => {
    try {
      const projectId = data.id;
      const file = data.file;
      const project = await addDrawingFile(projectId, file);
      console.log(project, '-----------')
      if (data.isApproved) {
        await this.upgradeOrderStatus(projectId, project?.orderStatus);
      }
      return { message: "data saved successfully" };
    } catch (err) {
      console.log("Error occured while drawing complete order");
      throw err;
    }
  };
  //material estimate update (orderStatus=3)
  materialEstimate = async (data: any) => {
    try {
      const projectId = data.id;
      const project: any = await getProject(projectId);
      //items are getting added(if item_id is null) and updated
      data.item = await Promise.all(data.item.map(async (el: any) => {
        let item;
        //if item_id exist in data set
        if (el.item_id) {
          //updates item with given data
          item = await Item.findByIdAndUpdate(el.item_id, el, { upsert: true, new: true });
        } else {
          //creates item with given data
          item = await Item.create(el);
        }
        el.item_id = item._id;
        return el;
      }));
      //if project have existing material_details
      if (project?.material_details) {
        //update material details
        const materialId = project.material_details._id
        await Material.findOneAndUpdate({ _id: materialId }, data, { new: true });
      } else {
        //create material details and update to project
        const newMaterial = await Material.create(data);
        await addMaterialIdToProject(projectId, newMaterial._id);
      }
      //approve to next orderStatus
      if (data?.isApproved) {
        await this.upgradeOrderStatus(projectId, project?.orderStatus);
      }
      return { message: "data saved successfully" };
    } catch (err) {
      console.log("Error Material Estimate order");
      throw err;
    }
  };
  //waiting confirmation complete (orderStatus=4);
  orderConfirmation = async (data: any) => {
    try {
      const projectId = data.id;
      const { transactionId, amount, paymentType } = data;
      const transactionDetails = {
        transactionId,
        date: Date.now(),
        amount,
        paymentType,
      };
      const project = await Project.findOneAndUpdate(
        { _id: projectId },
        {
          $push: {
            transactionDetails: transactionDetails,
          },
        },
        { new: true }
      );
      if (data.isApproved) {
        await this.upgradeOrderStatus(projectId, project?.orderStatus);
      }
      return { message: "data saved successfully" };
    } catch (err) {
      console.log("Error occured while entering order confirmation");
      throw err;
    }
  };
  //material arrival estimate complete (orderStatus=5)
  productionUpdation = async (data: any) => {
    try {
      const projectId = data.id;
      const project = await getProject(projectId);
      if (project?.production_details) {
        const productionDetails: any = project.production_details;
        await Production.findOneAndUpdate({ _id: productionDetails._id }, data)
      } else {
        const newProductionDetails = await Production.create(data);
        await addProductionIdToProject(projectId, newProductionDetails._id);
      }
      if (data.isApproved) {
        await this.upgradeOrderStatus(projectId, project?.orderStatus);
      }
      return { message: "data saved successfully" };
    } catch (err) {
      console.log("Error occured while entering order");
      throw err;
    }
  };
  //arrivalEstimate
  arrivalEstimate = async (data: any) => {
    try {
      const projectId = data.id;
      const { isArrived, priority, estDateOfArrival } = data
      const newProject = await Project.findOneAndUpdate({ _id: projectId }, { isArrived, priority, estDateOfArrival }, { new: true });
      if (data.isApproved) {
        await this.upgradeOrderStatus(projectId, newProject?.orderStatus);
      }
      return { message: "data saved successfully" };
    } catch (err) {
      console.log("Error occured while entering order");
      throw err;
    }
  }
  //delivery
  deliveryUpdation = async (data: any) => {
    try {
      const projectId = data.id;
      const { driverNumber, vehicleNumber } = data
      const newProject = await Project.findOneAndUpdate({ _id: projectId }, { delivery: { driverNumber, vehicleNumber } }, { new: true });
      if (data.isApproved) {
        await this.upgradeOrderStatus(projectId, newProject?.orderStatus);
      }
      return { message: "data saved successfully" };
    } catch (err) {
      console.log("Error occured while entering order");
      throw err;
    }
  }
  //installation
  //awaiting service
  //service
  //close
  //cancel

  upgradeOrderStatus = async (projectId: any, currentStatus: any) => {
    try {
      const newStatus = currentStatus + 1;
      return await updateStatus(projectId, newStatus);
    } catch (err) {
      throw (err);
    }
  };
}
