import mongoose, { Schema } from "mongoose";

const materialSchema = new Schema(
  {
    item: [{
      item_id: {
        type: mongoose.Types.ObjectId,
        ref: "Item",
      },
      quantity: {
        type: Number,
        default: 0,
        required: [true, "Quantity is required"],
      },
      subTotal: {
        type: Number,
        default: 0,
      }
    }],
    grossTotal: {
      type: Number,
    },
    estimatedDaysOfCompletion: {
      type: Number,
    },
  },
  { timestamps: true },
);


export const Material = mongoose.model("Material", materialSchema);
