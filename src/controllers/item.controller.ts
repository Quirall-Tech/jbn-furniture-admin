import { Request, Response } from "express";

import { ItemService } from "../services/item.service";

const itemService = new ItemService();

export const addItem = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result: any = await itemService.addItem(data);

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internsal Server Error", message: err });
  }
};

export const itemList = async (req: Request, res: Response) => {
  try {
    const result: any = await itemService.itemList();

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id
    const result: any = await itemService.getItem(itemId);

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const data = req.body;
    const result: any = await itemService.updateItem(itemId,data);

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const deletedItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const result: any = await itemService.deleteItem(itemId);

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
