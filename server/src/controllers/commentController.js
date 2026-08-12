import asyncHandler from "../utils/asyncHandler.js";

import {
    createNewComment,
    getComments,
    getComment,
    editComment,
    removeComment,
} from "../services/commentService.js";

/**
 * Create Comment
 */
const createComment = asyncHandler(async (req, res) => {
    const comment = await createNewComment(
        req.params.bugId,
        req.body.content,
        req.user._id
    );

    res.status(201).json({
        success: true,
        message: "Comment added successfully.",
        data: comment,
    });
});

/**
 * Get all comments for a bug
 */
const getBugComments = asyncHandler(async (req, res) => {
    const comments = await getComments(
        req.params.bugId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        count: comments.length,
        data: comments,
    });
});

/**
 * Get comment by ID
 */
const getCommentById = asyncHandler(async (req, res) => {
    const comment = await getComment(
        req.params.id,
        req.user._id
    );

    res.status(200).json({
        success: true,
        data: comment,
    });
});

/**
 * Update Comment
 */
const updateComment = asyncHandler(async (req, res) => {
    const comment = await editComment(
        req.params.id,
        req.body.content,
        req.user._id
    );

    res.status(200).json({
        success: true,
        message: "Comment updated successfully.",
        data: comment,
    });
});

/**
 * Delete Comment
 */
const deleteComment = asyncHandler(async (req, res) => {
    await removeComment(
        req.params.id,
        req.user._id
    );

    res.status(200).json({
        success: true,
        message: "Comment deleted successfully.",
    });
});

export {
    createComment,
    getBugComments,
    getCommentById,
    updateComment,
    deleteComment,
};