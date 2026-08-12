import Comment from "../models/Comment.js";

/**
 * Create a comment
 */
const createComment = async (commentData) => {
    return await Comment.create(commentData);
};

/**
 * Get all comments for a bug
 */
const findBugComments = async (bugId) => {
    return await Comment.find({
        bug: bugId,
    })
        .populate("user", "name email role")
        .sort({
            createdAt: 1,
        });
};

/**
 * Find comment by ID
 */
const findCommentById = async (commentId) => {
    return await Comment.findById(commentId)
        .populate("user", "name email role")
        .populate("bug", "bugId title project");
};

/**
 * Update comment
 */
const updateComment = async (
    commentId,
    updatedData
) => {
    return await Comment.findByIdAndUpdate(
        commentId,
        updatedData,
        {
            new: true,
            runValidators: true,
        }
    ).populate(
        "user",
        "name email role"
    );
};

/**
 * Delete comment
 */
const deleteComment = async (commentId) => {
    return await Comment.findByIdAndDelete(
        commentId
    );
};

export {
    createComment,
    findBugComments,
    findCommentById,
    updateComment,
    deleteComment,
};