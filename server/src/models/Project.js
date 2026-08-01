import mongoose from "mongoose";
import generateSlug from "../utils/generateSlug.js";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Project name is required"],
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        slug: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Project description is required"],
            trim: true,
            maxlength: 500,
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },

        visibility: {
            type: String,
            enum: ["Private", "Team"],
            default: "Private",
        },

        tags: [
            {
                type: String,
                trim: true,
            },
        ],

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },

                role: {
                    type: String,
                    enum: ["Owner", "Developer", "Tester"],
                    default: "Developer",
                },

                joinedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        status: {
            type: String,
            enum: ["Active", "Completed", "Archived"],
            default: "Active",
        },

    },
    {
        timestamps: true,
    }
);

projectSchema.index(
    {
        createdBy: 1,
        slug: 1,
    },
    {
        unique: true,
    }
);

// projectSchema.pre("validate", function (next) {
//     if (this.isModified("name")) {
//         this.slug = generateSlug(this.name);
//     }

//     next();
// });

projectSchema.pre("validate", function (next) {

    if (this.isNew) {

        this.slug = generateSlug(this.name);

    }

    next();

});


const Project = mongoose.model("Project", projectSchema);

export default Project;