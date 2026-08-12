import asyncHandler from "../utils/asyncHandler.js";

import {
    getBugActivities,
    getActivity,
} from "../services/activityService.js";

/**
 * Get all activities for a bug
 */
const getBugActivityTimeline = asyncHandler(
    async (req, res) => {
        const activities = await getBugActivities(
            req.params.bugId,
            req.user._id
        );

        res.status(200).json({
            success: true,
            count: activities.length,
            data: activities,
        });
    }
);

/**
 * Get activity by ID
 */
const getActivityById = asyncHandler(
    async (req, res) => {
        const activity = await getActivity(
            req.params.id,
            req.user._id
        );

        res.status(200).json({
            success: true,
            data: activity,
        });
    }
);

export {
    getBugActivityTimeline,
    getActivityById,
};