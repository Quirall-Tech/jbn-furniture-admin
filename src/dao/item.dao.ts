import { Item } from "../db/models/Item";
export const addItem = async (data:any)=>{
  try {
    const item = data;
    const createdItem = await Item.create(item);
    return createdItem;
  } catch (err) {
    console.log("Error occured while adding item");    
    throw err;
  }
}
export const getItem = async (itemId:any)=>{
  try {
    const item = await Item.findOne({_id:itemId});
    return item;
  } catch (err) {
    console.log("Error occured while getting item");    
    throw err;
  }
}
export const getItemByName = async (name:any)=>{
  try {
    const itemName = name;
    const item = await Item.findOne({name:itemName});
    return item;
  } catch (err) {
    console.log("Error occured while getting item");    
    throw err;
  }
}
export const updateItem = async (id:string,dataToChange:any)=>{
  try {
    const updatedItem = await Item.findOneAndUpdate({_id:id},{...dataToChange},{returnDocument:'after'});
    return updatedItem;
  } catch (err) {
    console.log("Error occured while updating item");    
    throw err;
  }
}
export const deleteItem = async (id:string)=>{
  try {
    const deletedItem = await Item.findOneAndDelete({_id:id});
    return deletedItem;
  } catch (err) {
    console.log("Error occured while deleting item");    
    throw err;
  }
}
export const listItem = async ()=>{
  try {
    const itemList = await Item.find();
    return itemList;
  } catch (err) {
    console.log("Error occured while find items");    
    throw err;
  }
}