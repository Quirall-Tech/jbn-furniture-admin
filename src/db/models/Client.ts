import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
  {
    fname: {
      type: String,
      required: [true, "First Name is Required"],
    },
    lname: {
      type: String,
    },
    mobile: {
      type: Number,
      unique: true,
      required: [true, "Mobile no is Required"],
    },
    email: {
      type: String,
    },
    address: {
      city: {
        type: String,
        required: [true, "City is Required"],
      },
      location: {
        type: String,
        required: [true, "Location or Landmark is Required"],
      },
      location_link:{
        type:String,
      }
    },
  },
  { timestamps: true }
);

export const Client = mongoose.model("Client", clientSchema);
