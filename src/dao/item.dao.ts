import { Item } from "../db/models/Item";

export const DbAddItem = async (body: any) => {
  try {
    const item = body;
    const checkItem = await Item.findOne({ name: item.name });
    console.log(checkItem,item);
    
    if (checkItem) {
      return {
        error: {
          message: "Item already exist",
        },
      };
    }else{
        const createdItem = await Item.create(item);
        return createdItem;
    }
  } catch (err) {
    throw err;
  }
};

export const DbItemList = async ()=>{
    try{
        return await Item.find({});
    }catch(err){

    }
}
