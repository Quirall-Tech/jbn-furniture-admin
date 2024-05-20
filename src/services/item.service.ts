import { addItem, deleteItem, getItem, getItemByName, listItem, updateItem } from "../dao/item.dao";
import { Item } from "../db/models/Item";
export class ItemService {

  addItem = async (data: any) => {
    try {
      const item = data;
      const checkItem = await getItemByName(item.name);
      if (checkItem) {
        return {
          error: {
            message: `Item already exist with name: ${item.name}`,
          },
        };
      } else {
        const createdItem = await addItem(item);
        return createdItem;
      }
    } catch (err) {
      throw err;
    }
  }
  itemList = async () => {
    try {
      return await listItem();
    } catch (err) {
      throw err;
    }
  }

  getItem = async (itemId: any) => {
    try {
      const item = await getItem(itemId);
      if (!item) {
        return {
          error: {
            message: "item dont exist in db"
          }
        }
      }
      return item;
    } catch (err) {
      throw err;
    }
  }

  updateItem = async (itemId: any, data: any) => {
    try {
      const item = await updateItem(itemId, data);
      return item;
    } catch (err) {
      throw err;
    }
  }

  deleteItem = async (itemId: any) => {
    try {
      const item = await deleteItem(itemId);
      return item;
    } catch (err) {
      throw err;
    }
  }
}
