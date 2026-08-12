import {
    createActivity,
    findBugActivities,
    findActivityById,
} from "../repositories/activityRepository.js";

import { findBugById } from "../repositories/bugRepository.js";
import { findProjectById } from "../repositories/projectRepository.js";

import ApiError from "../utils/ApiError.js";

/**
 * Check whether a user belongs to the bug's project
 */
const authorizeActivityViewer = async (
    bug,
    userId
) => {
    const project = await findProjectById(
        bug.project._id
    );

    if (!project) {
        throw new ApiError(
            404,
            "Project not found."
        );
    }

    const isMember = project.members.some(
        (member) =>
            member.user._id.toString() ===
            userId.toString()
    );

    if (!isMember) {
        throw new ApiError(
            403,
            "You are not a member of this project."
        );
    }

    return project;
};

/**
 * Record a new activity
 */
const recordActivity = async (
    activityData
) => {
    return await createActivity(
        activityData
    );
};

/**
 * Get bug activity timeline
 */
const getBugActivities = async (
    bugId,
    loggedInUserId
) => {
    const bug = await findBugById(bugId);

    if (!bug) {
        throw new ApiError(
            404,
            "Bug not found."
        );
    }

    await authorizeActivityViewer(
        bug,
        loggedInUserId
    );

    return await findBugActivities(
        bugId
    );
};

/**
 * Get activity by ID
 */
const getActivity = async (
    activityId,
    loggedInUserId
) => {
    const activity =
        await findActivityById(
            activityId
        );

    if (!activity) {
        throw new ApiError(
            404,
            "Activity not found."
        );
    }

    const bug = await findBugById(
        activity.bug._id
    );

    if (!bug) {
        throw new ApiError(
            404,
            "Bug not found."
        );
    }

    await authorizeActivityViewer(
        bug,
        loggedInUserId
    );

    return activity;
};

export {
    recordActivity,
    getBugActivities,
    getActivity,
};