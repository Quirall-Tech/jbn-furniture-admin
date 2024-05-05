import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    orderStatus: { 
        type: Number, 
        default: 1,
        required: [true,"orderStatus is required"]
    },
    comments: { 
        type: String, 
    },
    description: { 
        type: String, 
    },
    estStartDate: { 
        type: Date, 
    },
    estDaysToComplete: { 
        type: Number, 
    },
    estMaterialArrival: { 
        type: Date, 
    },
    client_details: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
      required:true
    },
    material_details: {
        type: mongoose.Types.ObjectId,
        ref: "Material",
    },
    attachments: {
        type: mongoose.Types.ObjectId,
        ref: "Attachment",
    },
    production_details: {
        type: mongoose.Types.ObjectId,
        ref: "Production",
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
