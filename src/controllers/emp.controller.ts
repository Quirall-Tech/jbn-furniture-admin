import { Request, Response } from "express";
import { EmployeeService } from "../services/emp.service";

const empService = new EmployeeService();

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result: any = await empService.addEmployee(data);

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internsal Server Error", message: err });
  }
};

export const employeeList = async (req: Request, res: Response) => {
  try {
    const result: any = await empService.employeeList();

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const empId = req.params.id
    const result: any = await empService.getEmployee(empId);

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const empId = req.params.id;
    const data = req.body;
    const result: any = await empService.updateEmployee(empId, data);

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const empId = req.params.id;
    const result: any = await empService.deleteEmployee(empId);

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
