import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "First Name is Required"],
    },
    mob: {
      type: Number,
      unique: true,
      required: [true, "Mobile no is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    add: {
      city: {
        type: String,
        required: [true, "City is Required"],
      },
      location: {
        type: String,
        required: [true, "Location or Landmark is Required"],
      },
      link:{
        type:String,
      }
    },
  },
  { timestamps: true }
);

export const Client = mongoose.model("Client", clientSchema);
