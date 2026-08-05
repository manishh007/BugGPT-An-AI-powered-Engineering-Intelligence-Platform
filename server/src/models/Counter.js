import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        sequence: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// One counter per project per resource
counterSchema.index(
    {
        project: 1,
        type: 1,
    },
    {
        unique: true,
    }
);

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;