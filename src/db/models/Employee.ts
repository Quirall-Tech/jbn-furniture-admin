import mongoose, { Schema } from "mongoose";

const empSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of item is required"],
    },
    mobile:{
        type:Number,
        unique:true,
        required:[true,'mobile of employee is required']
    },
    perHourWage: {
      type: Number,
      required: [true, "Price per hour is required"],
    },
  },
  { timestamps: true }
);


export const Employee = mongoose.model("Employee", empSchema);
