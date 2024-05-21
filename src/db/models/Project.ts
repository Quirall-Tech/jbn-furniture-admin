import mongoose, { Schema } from "mongoose";
import { string } from "zod";

const projectSchema = new Schema(
    {
        orderStatus: {
            type: Number,
            default: 1,
            required: [true, "orderStatus is required"]
        },
        orderNumber: {
            type: String,
            unique: true,
        },
        notes: {
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
        estDateOfArrival: {
            type: Date,
        },
        priority: {
            type: String,
            enum: ["HIGH", "MEDIUM", "CRITICAL", "LOW"],
            default: "HIGH",
        },
        isArrived: {
            type: Boolean,
            default: false,
        },
        transactionDetails: [{
            transactionId: String,
            date: Date,
            amount: Number,
            paymentType: String,
        }],
        client: {
            type: mongoose.Types.ObjectId,
            ref: "Client",
            required: true
        },
        material_details: {
            type: mongoose.Types.ObjectId,
            ref: "Material",
        },
        delivery: {
            driverNumber: {
                type: Number
            },
            vehicleNumber: {
                type: String
            }
        },
        installationDate:{
            type:Date,
        },
        attachments: {
            drawingFile: [
                {
                    url: {
                        type: String,
                    },
                    date: {
                        type: Date
                    },
                    notes: {
                        type: String
                    }
                }
            ],
            materialEstimateFile: [
                {
                    url: {
                        type: String,
                    },
                    date: {
                        type: Date
                    },
                    notes: {
                        type: String
                    }
                }
            ],
            installationFile: [
                {
                    url: {
                        type: String,
                    },
                    date: {
                        type: Date
                    },
                    notes: {
                        type: String
                    }
                }
            ],
            closingReportFile: [
                {
                    url: {
                        type: String,
                    },
                    date: {
                        type: Date
                    },
                    notes: {
                        type: String
                    }
                }
            ],
            serviceReportFile: [
                {
                    url: {
                        type: String,
                    },
                    date: {
                        type: Date
                    },
                    notes: {
                        type: String
                    }
                }
            ],

        },
        production_details: {
            type: mongoose.Types.ObjectId,
            ref: "Production",
        },
    },
    { timestamps: true }
);

projectSchema.pre("save", async function (next) {
    if (!this.orderNumber) {
        // Find the highest order number from existing records
        const Model = mongoose.model("Project");
        const highestOrder = await Model.findOne(
            {}, {},
            { sort: { orderNumber: -1 } }
        );

        let orderNumber = "ORD_001"; // Default value for the first order

        if (highestOrder) {
            const lastOrderNumber = highestOrder.orderNumber;
            const lastOrderNumberNumeric = parseInt(lastOrderNumber.split("_")[1]);
            // Increment the last order number
            orderNumber = `ORD_${(lastOrderNumberNumeric + 1)
                .toString()
                .padStart(3, "0")}`;
        }

        this.orderNumber = orderNumber;
    }
    next();
});

export const Project = mongoose.model("Project", projectSchema);
