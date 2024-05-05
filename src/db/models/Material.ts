import mongoose, { Schema } from "mongoose";

const materialSchema = new Schema(
  {
    list: [{
        list_id:{
            type: mongoose.Types.ObjectId,
            ref: "List",
            required: [true, "List id is required"],
        },
        quantity: {
            type: Number,
            default:0,
            required:[true, "Quantity is required"],
        },
        subTotal: {
          type: Number,
          default: 0,
        }
    }],
    grossTotal: {
      type: Number,
      default: 0,
      required: [true, "Gross total is required"],
    },
  },
  { timestamps: true },
);


export const Material = mongoose.model("Material", materialSchema);
