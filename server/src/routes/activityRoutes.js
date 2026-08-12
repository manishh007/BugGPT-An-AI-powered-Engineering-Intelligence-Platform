import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getBugActivityTimeline,
    getActivityById,
} from "../controllers/activityController.js";

const router = express.Router();

/**
 * Get all activities for a bug
 */
router.get(
    "/bugs/:bugId/activities",
    protect,
    getBugActivityTimeline
);

/**
 * Get activity by ID
 */
router.get(
    "/activities/:id",
    protect,
    getActivityById
);

export default router;