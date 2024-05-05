import mongoose, { Schema } from "mongoose";

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of item is required"],
    },
    code: {
      type: String,
      required: [true, "Code of item is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    unitCalculated: {
      type: String,
      default: 'quantity',
      required :true
    },
  },
  { timestamps: true },
);


export const List = mongoose.model("List", listSchema);
