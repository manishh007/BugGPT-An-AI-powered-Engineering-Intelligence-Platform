import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        bug: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bug",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        action: {
            type: String,
            enum: [
                "created",
                "updated",
                "status_changed",
                "assigned",
                "commented",
                "archived",
            ],
            required: true,
        },

        field: {
            type: String,
            default: null,
        },

        oldValue: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

        newValue: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },
    },
    {
        timestamps: true,

        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
                return ret;
            },
        },
    }
);

activitySchema.index({
    bug: 1,
    createdAt: 1,
});

const Activity = mongoose.model(
    "Activity",
    activitySchema
);

export default Activity;