import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    name: {
      type: String,
      unique:true,
      required: [true, "Name of item is required"],
    },
    code: {
      type: String,
      unique:true,
      // required: [true, "Code of item is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    unitCalculated: {
      type: String,
      default: "quantity",
      required: true,
    },
  },
  { timestamps: true }
);

itemSchema.pre("save", async function (next) {
  if (!this.code) {
    // Find the highest order number from existing records
    const Model = mongoose.model("Item");
    const highestOrder = await Model.findOne(
      {},{},
      { sort: { code: -1 } }
    );

    let itemNumber = "ITM_001"; // Default value for the first order

    if (highestOrder) {
      const lastItemNumber = highestOrder.code;
      const lastItemNumberNumeric = parseInt(lastItemNumber.split("_")[1]);
      // Increment the last order number
      itemNumber = `ITM_${(lastItemNumberNumeric + 1)
        .toString()
        .padStart(3, "0")}`;
    }

    this.code = itemNumber;
  }
  next();
});

export const Item = mongoose.model("Item", itemSchema);
