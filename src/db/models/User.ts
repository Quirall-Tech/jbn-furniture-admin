import mongoose, { Schema } from "mongoose";
import { hash } from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Must be at least 6 char long"],
      maxLength: [12, "Can't be morethan 12 char long "],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: [true, "Role is required"],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  const password = this.password;
  const hashedPassword = await hash(password, 10);
  this.password = hashedPassword;
  next();
});

export const User = mongoose.model("User", userSchema);
