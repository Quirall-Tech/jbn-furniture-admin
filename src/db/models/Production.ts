import mongoose, { Schema } from "mongoose";

const productionSchema = new Schema(
  {
    status: {
      type: Number,
      default: 1,
    },
    supervisor: {
      type: String,
      required: true,
    },
    workflow_progress: {
      process1: {
        percentCompleted: Number,
        isCompleted: Boolean,
        isStarted: Boolean,
        approvedBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
      process2: {
        percentCompleted: Number,
        isCompleted: Boolean,
        isStarted: Boolean,
        approvedBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
      process3: {
        percentCompleted: Number,
        isCompleted: Boolean,
        isStarted: Boolean,
        approvedBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
      process4: {
        percentCompleted: Number,
        isCompleted: Boolean,
        isStarted: Boolean,
        approvedBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
      process5: {
        percentCompleted: Number,
        isCompleted: Boolean,
        isStarted: Boolean,
        approvedBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
      process6: {
        percentCompleted: Number,
        isCompleted: Boolean,
        isStarted: Boolean,
        approvedBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    },
  },
  { timestamps: true }
);

export const Production = mongoose.model("Production", productionSchema);
