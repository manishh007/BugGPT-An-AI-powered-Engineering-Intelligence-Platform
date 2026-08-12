import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    createComment,
    getBugComments,
    getCommentById,
    updateComment,
    deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

/**
 * Create Comment
 */
router.post(
    "/bugs/:bugId/comments",
    protect,
    createComment
);

/**
 * Get all comments for a bug
 */
router.get(
    "/bugs/:bugId/comments",
    protect,
    getBugComments
);

/**
 * Get Comment by ID
 */
router.get(
    "/comments/:id",
    protect,
    getCommentById
);

/**
 * Update Comment
 */
router.put(
    "/comments/:id",
    protect,
    updateComment
);

/**
 * Delete Comment
 */
router.delete(
    "/comments/:id",
    protect,
    deleteComment
);

export default router;