import mongoose, { Schema } from "mongoose";

const attachmentSchema = new Schema(
  {
    file: [
      {
        fileLocation: {
          type: String,
          required: [true, "File Location is required"],
        },
        fileFor: {
          type: String,
          enum: ["dr", "me", "ip", "cr", "pr", "sr"],
          required: [true, "Mention what is this file for"],
        },
      },
    ],
  },
  { timestamps: true }
);

export const Attachment = mongoose.model("Attachment", attachmentSchema);
