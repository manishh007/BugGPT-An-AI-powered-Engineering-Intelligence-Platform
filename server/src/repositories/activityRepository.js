import Activity from "../models/Activity.js";

/**
 * Create activity
 */
const createActivity = async (activityData) => {
    return await Activity.create(activityData);
};

/**
 * Get all activities for a bug
 */
const findBugActivities = async (bugId) => {
    return await Activity.find({
        bug: bugId,
    })
        .populate("user", "name email role")
        .sort({
            createdAt: 1,
        });
};

/**
 * Find activity by ID
 */
const findActivityById = async (activityId) => {
    return await Activity.findById(activityId)
        .populate("user", "name email role")
        .populate("bug", "bugId title project");
};

export {
    createActivity,
    findBugActivities,
    findActivityById,
};