import express from "express";
import {
    createBugValidator,
    updateBugValidator,
} from "../validators/bugValidator.js";
import validate from "../middleware/validate.js";
import protect from "../middleware/authMiddleware.js";

import {
    createBug,
    getProjectBugs,
    getBugById,
    updateBug,
    deleteBug,
    analyzeBugWithAI,
} from "../controllers/bugController.js";

const router = express.Router();

/**
 * Create Bug
 */
router.post(
    "/",
    protect,
    createBugValidator,
    validate,
    createBug
);

/**
 * Get all bugs of a project
 */
router.get(
    "/project/:projectId",
    protect,
    getProjectBugs
);

/**
 * Analyze Bug with AI
 */
router.post(
    "/:id/analyze",
    protect,
    analyzeBugWithAI
);

/**
 * Get Bug by ID
 */
router.get(
    "/:id",
    protect,
    getBugById
);

/**
 * Update Bug
 */
router.put(
    "/:id",
    protect,
    updateBugValidator,
    validate,
    updateBug
);

/**
 * Archive Bug
 */
router.delete(
    "/:id",
    protect,
    deleteBug
);

export default router;