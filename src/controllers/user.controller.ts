import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export const userList = async (req: Request, res: Response) => {
    try {
        const result: any = await userService.userList();

        if (result?.error) {
            res.status(400).json({ status: "failed", message: result.error.message });
        } else {
            res.status(200).json({ status: "success", data: result });
        }
    } catch (err) {
        res.status(500).json({ status: "Internsal Server Error", message: err });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const userId = req.params.id;
        const result: any = await userService.updateUser(userId, data);

        if (result?.error) {
            res.status(400).json({ status: "failed", message: result.error.message });
        } else {
            res.status(200).json({ status: "success", data: result });
        }
    } catch (err) {
        res.status(500).json({ status: "Internal Server Error", message: err });
    }
};

export const blockUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const result: any = await userService.blockUser(userId);

        if (result?.error) {
            res.status(400).json({ status: "failed", message: result.error.message });
        } else {
            res.status(200).json({ status: "success", data: result });
        }
    } catch (err) {
        res.status(500).json({ status: "Internal Server Error", message: err });
    }
};

export const unBlockUser = async (req: Request, res: Response) => {
    try {
        const itemId = req.params.id;
        const result: any = await userService.unBlockUser(itemId);

        if (result?.error) {
            res.status(400).json({ status: "failed", message: result.error.message });
        } else {
            res.status(200).json({ status: "success", data: result });
        }
    } catch (err) {
        res.status(500).json({ status: "Internal Server Error", message: err });
    }
};

