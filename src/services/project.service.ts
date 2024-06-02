import { Client } from "../db/models/Client";
import { Project } from "../db/models/Project";
import {
  addClosingReportFile,
  addDrawingFile,
  addInstallationFile,
  addMaterialEstimateFile,
  addMaterialIdToProject,
  addProductionIdToProject,
  addProject,
  addServiceReportFile,
  deleteFile,
  getProject,
  listProject,
  updateProject,
} from "../dao/project.dao";
import { Material } from "../db/models/Material";
import { Production } from "../db/models/Production";
import { Item } from "../db/models/Item";
import { OrderStatus } from "../common/constants";

export class ProjectService {
  //create new project
  createProject = async (data: any) => {
    try {
      const { client, notes, description, projectTotal } = data;
      //data contains mob, name and city of client

      if (client.mob && client.name && client.add.city) {
        const checkClient = await Client.findOne({ mob: client.mob });
        //check client in db
        if (checkClient) {
          const data: any = {
            client: checkClient._id,
            notes,
            description,
            projectTotal
          };
          return await addProject(data);
        } else {
          const newClient = await Client.create(client);
          const data: any = { client: newClient._id, notes, description, projectTotal };
          return await addProject(data);
        }

      } else {
        return {
          error: {
            message: "Mandatory fields not filled"
          }
        }
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
      console.log("Error occured while getting project list", err);
      throw err;
    }
  };
  //one project details
  getProjectById = async (id: any) => {
    try {
      return await getProject(id);
    } catch (err) {
      console.log("Error occured while getting project list", err);
      throw err;
    }
  };
  //not using in controller - order entering complete (orderStatus=1) Note: will move to drawing status if approved
  orderEnteringUpdate = async (data: any) => {
    try {
      const projectId = data.id;
      let project;
      if (data.client && data.furnitureList && data.projectTotal) {
        project = await updateProject(projectId, data);
        return project;
      }
      //approve to next orderStatus
      if (data?.isApproved) {
        project = await Project.findOneAndUpdate({ _id: projectId }, { orderStatus: OrderStatus.DRAWING }, { new: true }); //----------------------------
      }
      if (project) {
        return project;
      } else {
        return {
          error: {
            message: "No proper data found"
          }
        }
      }

    } catch (err) {
      console.log("Error occured while updating order");
      throw err;
    }
  };
  //drawing update and complete (orderStatus=2)
  drawingUpdate = async (data: any) => {
    try {
      const projectId = data.id;
      const file = data.file;
      let project;
      console.log(file);

      if (file.length > 0) {
        project = await addDrawingFile(projectId, file);
      }

      if ((typeof data.isApproved === "string" && data.isApproved === "true") || (data.isApproved === true)) {
        project = await Project.findOneAndUpdate({ _id: projectId }, { orderStatus: OrderStatus.MATERIAL_ESTIMATE }, { new: true }); //----------------------------
      }
      if (project) {
        return project;
      } else {
        return {
          error: {
            message: "No proper data found"
          }
        }
      }
    } catch (err) {
      console.log("Error occured while drawing complete order");
      throw err;
    }
  };
  //material estimate update (orderStatus=3)
  materialEstimate = async (data: any) => {
    try {
      const projectId = data.id;
      const { item } = data;
      let project: any;
      if (item.length > 0) {
        project = await getProject(projectId);
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
          project = await Material.findOneAndUpdate({ _id: materialId }, data, { new: true });
        } else {
          //create material details and update to project
          const newMaterial = await Material.create(data);
          project = await addMaterialIdToProject(projectId, newMaterial._id);
        }
        //approve to next orderStatus
        if (data?.isApproved) {
          project = await Project.findOneAndUpdate({ _id: projectId }, { orderStatus: OrderStatus.WAITING_CONFIRMATION }, { new: true }); //----------------------------
        }
      } else {
        return {
          error: {
            message: "No proper data found"
          }
        }
      }
      return project;
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
      let project;
      if (amount && paymentType) {
        project = await Project.findOneAndUpdate(
          { _id: projectId },
          {
            $push: {
              transactionDetails: transactionDetails,
            },
          },
          { new: true }
        );
      }
      if (data.isApproved) {
        project = await Project.findOneAndUpdate({ _id: projectId }, { orderStatus: OrderStatus.MATERIAL_ARRIVAL }, { new: true }); //----------------------------
      }
      if (project) {
        return project;
      }
      return {
        error: {
          message: "No proper data found"
        }
      }
    } catch (err) {
      console.log("Error occured while entering order confirmation");
      throw err;
    }
  };
  //arrivalEstimate
  arrivalEstimate = async (data: any) => {
    try {
      const projectId = data.id;
      const { isArrived, priority, estDateOfArrival } = data
      let project;
      if (priority || estDateOfArrival) {
        project = await Project.findOneAndUpdate({ _id: projectId }, { isArrived, priority, estDateOfArrival }, { new: true });
      }
      if (data.isApproved && data.isArrived) {
        project = await Project.findOneAndUpdate({ _id: projectId }, { orderStatus: OrderStatus.PRODUCTION }, { new: true }); //----------------------------
      }
      if (project) {
        return project;
      }
      return {
        error: {
          message: "No proper data found"
        }
      };
    } catch (err) {
      console.log("Error occured while estimate arrival order");
      throw err;
    }
  }
  //material arrival estimate complete (orderStatus=5)
  productionUpdation = async (data: any) => {
    try {
      const projectId = data.id;
      const { inCharge, productionStatus } = data;
      let project;
      // if not proper data
      if (inCharge && productionStatus) {
        project = await getProject(projectId);

        if (project?.production_details) {

          const productionDetails: any = project.production_details;

          //setting status from list of production data
          let productionStatus;
          Object.values(data.productionStatus).forEach((valueObj: any, index: number) => {
            if (valueObj.percentCompleted > 0) {
              productionStatus = index + 1;
            }
          })
          data.status = productionStatus;

          //updating with production details
          project = await Production.findOneAndUpdate({ _id: productionDetails._id }, data)
        } else {

          //new production collection create and linking with existing project
          const newProductionDetails = await Production.create(data);
          project = await addProductionIdToProject(projectId, newProductionDetails._id);
        }
      }

      //if approved status updation to next step
      if (data.isApproved) {
        project = await Project.findOneAndUpdate({ _id: projectId }, { orderStatus: OrderStatus.DELIVERY }, { new: true }); //----------------------------
      }
      if (project) {
        return project;
      }
      return {
        error: {
          message: "No proper data found"
        }
      };
    } catch (err) {
      console.log("Error occured while production updates");
      throw err;
    }
  };
  //delivery
  deliveryUpdation = async (data: any) => {
    try {
      const projectId = data.id;
      const { driverNumber, vehicleNumber, furnitureList } = data;
      let project;
      if (driverNumber && vehicleNumber) {
        project = await Project.findOneAndUpdate({ _id: projectId }, { delivery: { driverNumber, vehicleNumber }, furnitureList }, { new: true });
      }
      if (data.isApproved && data.isDelivered) {
        project = await Project.findOneAndUpdate({ _id: projectId }, { orderStatus: OrderStatus.INSTALLATION, "delivery.date": Date.now() }, { new: true }); //----------------------------
      }
      if (project) {
        return project;
      }
      return {
        error: {
          message: "No proper data found"
        }
      };
    } catch (err) {
      console.log("Error occured while delivery updates");
      throw err;
    }
  }
  //installation
  installationUpdate = async (data: any) => {
    try {
      const projectId = data.id;
      const { furnitureList, inCharge, extraExpense, serviceAfter, installationStatus, dayWorkNote, workersData } = data
      let project;
      if (inCharge) {
        project = await Project.findOneAndUpdate({ _id: projectId }, { furnitureList, installationData: { inCharge, extraExpense, serviceAfter, installationStatus, workersData } }, { new: true });
        if (dayWorkNote) {
          project = await Project.findOneAndUpdate({ _id: projectId }, {
            $push: {
              'installationData.dayWorkNote': { text: dayWorkNote, date: Date.now() }
            },
          }, {
            new: true
          })
        }
      }
      if (data.isApproved && data.serviceAfter) {
        project = await Project.findOneAndUpdate({ _id: projectId }, { orderStatus: OrderStatus.INSTALLATION, "delivery.date": Date.now() }, { new: true }); //----------------------------
      }
      if (project) {
        return project;
      }
      return {
        error: {
          message: "No proper data found"
        }
      };
    } catch (err) {
      console.log("Error occured while installation updates");
      throw err;
    }
  };

  //awaiting service
  awaitingServiceUpdate = async (data: any) => {
    try {
      const projectId = data.id;
      if (data?.isApproved) {
        data.orderStatus = OrderStatus.SERVICE
      }

      await Project.findOneAndUpdate({ _id: projectId }, data, { new: true });
      return { message: "data saved successfully" };
    } catch (err) {
      console.log("Error occured awaiting service completion");
      throw err;
    }
  }

  //service
  serviceUpdate = async (data: any) => {
    try {
      const projectId = data.id;
      const file = data.file;
      const project = await addServiceReportFile(projectId, file);

      if ((typeof data.isApproved === "string" && data.isApproved === "true") || (data.isApproved === true)) {
        await Project.findOneAndUpdate({ _id: projectId }, { orderStatus: OrderStatus.TO_CLOSE }, { new: true }); //----------------------------
      }
      return { message: "data saved successfully" };
    } catch (err) {
      console.log("Error occured while service file upload");
      throw err;
    }
  };
  //close
  closingUpdate = async (data: any) => {
    try {
      const projectId = data.id;
      const file = data.file;
      const project = await addClosingReportFile(projectId, file);

      if ((typeof data.isApproved === "string" && data.isApproved === "true") || (data.isApproved === true)) {
        await Project.findOneAndUpdate({ _id: projectId }, { orderStatus: OrderStatus.CLOSED }, { new: true }); //----------------------------
      }
      return { message: "data saved successfully" };
    } catch (err) {
      console.log("Error occured while installation file upload");
      throw err;
    }
  }
  //cancel
  cancelOrder = async (projectId: any) => {
    try {
      const project = await Project.findOneAndUpdate({ _id: projectId }, { orderStatus: OrderStatus.CANCELLED }, { new: true });

      return { message: "data saved successfully" };
    } catch (err) {
      console.log("Error occured while entering order");
      throw err;
    }
  }
  //fileUpload
  fileUpload = async (data: any) => {
    try {
      //projectId
      const projectId = data.id;
      //file and key
      const { file, key } = data;
      if (file.length > 0) {
        if (key === "close") {
          return await addClosingReportFile(projectId, file);
        } else if (key === "service") {
          return await addServiceReportFile(projectId, file);
        } else if (key === "installation") {
          return await addInstallationFile(projectId, file);
        } else if (key === "drawing") {
          return await addDrawingFile(projectId, file);
        } else if (key === "invoice") {
          return await addMaterialEstimateFile(projectId, file)
        } else {
          return {
            error: {
              message: "No proper data found"
            }
          }
        }
      }
      return {
        error: {
          message: "No proper data found"
        }
      }
    } catch (err) {
      console.log("Error occured while drawing complete order");
      throw err;
    }
  }
  //fileUpload
  deleteFile = async (projectId: any, fileId: any, key: any) => {
    try {
      const result = await deleteFile(projectId, fileId, key);
      if (!result) {
        return {
          error: {
            message: "No database items matching given data"
          }
        }
      }
      return result;
    } catch (err) {
      console.log("Error occured while drawing complete order");
      throw err;
    }
  }
}
