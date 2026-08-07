import Bug from "../models/Bug.js";

/**
 * Create a new bug
 */
const createBug = async (bugData) => {
    return await Bug.create(bugData);
};

/**
 * Find bug by MongoDB ID
 */
const findBugById = async (bugId) => {
    return await Bug.findById(bugId)
        .populate("project", "name slug createdBy")
        .populate("reportedBy", "name email role")
        .populate("assignedTo", "name email role");
};

//find bug by bug ID

const findBugByBugId = async (projectId, bugId) => {
    return await Bug.findOne({
        project: projectId,
        bugId,
    });
};

/**
 * Get all bugs of a project
 */
const findProjectBugs = async (projectId) => {
    return await Bug.find({
        project: projectId,
        isArchived: false,
    })
        .populate("project", "name slug createdBy")
        .populate("reportedBy", "name email role")
        .populate("assignedTo", "name email role")
        .sort({
            createdAt: -1,
        });
};

/**
 * Update Bug
 */
const updateBug = async (bugId, updatedData) => {
    return await Bug.findByIdAndUpdate(
        bugId,
        updatedData,
        {
            new: true,
            runValidators: true,
        }
    )
        .populate("reportedBy", "name email role")
        .populate("assignedTo", "name email role");
};

/**
 * Archive Bug
 */
const archiveBug = async (bugId) => {
    return await Bug.findByIdAndUpdate(
        bugId,
        {
            isArchived: true,
        },
        {
            new: true,
        }
    );
};

export {
    createBug,
    findBugById,
    findBugByBugId,
    findProjectBugs,
    updateBug,
    archiveBug,
};