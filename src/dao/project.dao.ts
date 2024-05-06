import { Client } from "../db/models/Client";
import { Project } from "../db/models/Project";

export const DbAddProject = async (body:any)=>{
    try{
        const clientDetails = body.client_details;
        const checkClient = await Client.findOne({mobile:clientDetails.mobile});
        
        if(checkClient){
            body.client_details = checkClient._id;
        }else{
            const client = await Client.create(clientDetails);
            body.client_details = client._id;
        }
        await Project.create(body);
    }catch(err){
        throw(err);
    }
};
export const DbGetProjectList = async ()=>{
    try{
        return await Project.find({}).populate(['client_details']);
    }catch(err){
        throw(err);
    }
};
export const DbGetProjectById = async (projectId:string)=>{
    try{
        return await Project.findById(projectId).populate(['client_details']);
    }catch(err){
        throw(err);
    }
};

