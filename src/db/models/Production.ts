import mongoose, { Schema } from "mongoose";

const productionSchema = new Schema(
  {
    // currentStatus: {
    //   type: Number,
    //   default: 1,
    // },
    // lastApprovedBy:{
    //   type: String,
    // },
    isCompleted:{
      type:Boolean
    },
    productionStatus: {
      "1": {
        percentCompleted: Number,
        isStarted: Boolean,
      },
      "2": {
        percentCompleted: Number,
        isStarted: Boolean,
      },
      "3": {
        percentCompleted: Number,
        isStarted: Boolean,
      },
      "4": {
        percentCompleted: Number,
        isStarted: Boolean,
      },
      "5": {
        percentCompleted: Number,
        isStarted: Boolean,
      },
      "6": {
        percentCompleted: Number,
        isStarted: Boolean,
      },
    },
  },
  { timestamps: true }
);

export const Production = mongoose.model("Production", productionSchema);
