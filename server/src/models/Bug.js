import mongoose from "mongoose";

const bugSchema = new mongoose.Schema(
    {
        bugId: {
            type: String,
            required: true,
            trim: true,
        },

        title: {
            type: String,
            required: [true, "Bug title is required"],
            trim: true,
            minlength: 5,
            maxlength: 150,
        },

        description: {
            type: String,
            required: [true, "Bug description is required"],
            trim: true,
            maxlength: 2000,
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        status: {
            type: String,
            enum: [
                "Open",
                "In Progress",
                "Resolved",
                "Closed",
            ],
            default: "Open",
        },

        priority: {
            type: String,
            enum: [
                "Low",
                "Medium",
                "High",
                "Critical",
            ],
            default: "Medium",
        },

        severity: {
            type: String,
            enum: [
                "Minor",
                "Major",
                "Critical",
                "Blocker",
            ],
            default: "Major",
        },

        labels: [
            {
                type: String,
                trim: true,
                lowercase: true,
            },
        ],

        environment: {
            browser: {
                type: String,
                trim: true,
            },
            operatingSystem: {
                type: String,
                trim: true,
            },
            appVersion: {
                type: String,
                trim: true,
            },
        },

        reproductionSteps: [
            {
                type: String,
                trim: true,
            },
        ],

        expectedResult: {
            type: String,
            trim: true,
        },

        actualResult: {
            type: String,
            trim: true,
        },

        aiAnalysis: {
            rootCause: {
                type: String,
                default: "",
            },

            suggestedFix: {
                type: String,
                default: "",
            },

            confidence: {
                type: Number,
                min: 0,
                max: 100,
                default: 0,
            },

            generatedAt: {
                type: Date,
                default: null,
            },

            estimatedComplexity: {
                type: String,
                enum: [
                    "Easy",
                    "Medium",
                    "Hard",
                ],
                default: "Medium",
            },
        },

        resolvedAt: {
            type: Date,
            default: null,
        },

        isArchived: {
            type: Boolean,
            default: false,
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

// Every bug ID should be unique within a project
bugSchema.index(
    {
        project: 1,
        bugId: 1,
    },
    {
        unique: true,
    }
);

// Frequently used dashboard queries
bugSchema.index({
    project: 1,
    status: 1,
});

bugSchema.index({
    assignedTo: 1,
});

bugSchema.index({
    reportedBy: 1,
});

const Bug = mongoose.model("Bug", bugSchema);

export default Bug;