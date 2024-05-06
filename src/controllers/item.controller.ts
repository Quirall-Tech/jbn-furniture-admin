import { Request, Response } from "express";
import { DbAddItem, DbItemList } from "../dao/item.dao";

export const addItem = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result: any = await DbAddItem(data);
    console.log(result);

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};

export const itemList = async (req: Request, res: Response) => {
  try {
    const result: any = await DbItemList();

    if (result?.error) {
      res.status(400).json({ status: "failed", message: result.error.message });
    } else {
      res.status(200).json({ status: "success", data: result });
    }
  } catch (err) {
    res.status(500).json({ status: "Internal Server Error", message: err });
  }
};
