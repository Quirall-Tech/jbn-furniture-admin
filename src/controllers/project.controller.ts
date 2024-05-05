import { Request, Response } from "express";
import { DbAddProject } from "../dao/project.dao";
/**
 * 
 * @param req 
 *
 * 
 * @param res 
 */
export const addProject = async (req:Request, res: Response)=>{
    try{
        const data = req.body;
        await DbAddProject(data);
        res.status(200).json({status:'success',message:"Project Created Successfully"})
    }catch(err){
        res.status(500).json({status:"Internal Server Error", message:err})
    }
}
/**
 * 
 * @param req 
 *
 * 
 * @param res 
 */
export const getList = async (req:Request, res: Response)=>{
    try{
        const result='';
        res.status(200).json({status:'success',data:result})
    }catch(err){
        res.status(500).json({status:"Internal Server Error", message:err})
    }
}
/**
 * 
 * @param req 
 *
 * 
 * @param res 
 */
export const editProject = async (req:Request, res: Response)=>{
    try{
        const result='';
        res.status(200).json({status:'success',data:result})
    }catch(err){
        res.status(500).json({status:"Internal Server Error", message:err})
    }
}
/**
 * 
 * @param req 
 *
 * 
 * @param res 
 */
export const getProject = async (req:Request, res: Response)=>{
    try{
        const result='';
        res.status(200).json({status:'success',data:result})
    }catch(err){
        res.status(500).json({status:"Internal Server Error", message:err})
    }
}
/**
 * 
 * @param req 
 *
 * 
 * @param res 
 */
export const deleteProject = async (req:Request, res: Response)=>{
    try{
        const result='';
        res.status(200).json({status:'success',data:result})
    }catch(err){
        res.status(500).json({status:"Internal Server Error", message:err})
    }
}