import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
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

        content: {
            type: String,
            required: [true, "Comment content is required"],
            trim: true,
            minlength: 1,
            maxlength: 2000,
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

commentSchema.index({
    bug: 1,
    createdAt: -1,
});

const Comment = mongoose.model(
    "Comment",
    commentSchema
);

export default Comment;