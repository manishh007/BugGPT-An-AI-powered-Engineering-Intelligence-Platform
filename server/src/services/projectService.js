import {
    createProject,
    findProjectById,
    findUserProjects,
    updateProject,
    deleteProject,
    slugExists,
} from "../repositories/projectRepository.js";

import ApiError from "../utils/ApiError.js";
import authorizeProjectOwner from "../utils/authorizeProject.js";
import generateUniqueSlug from "../utils/generateUniqueSlug.js";

/**
 * Create a new project
 */
const createNewProject = async (projectData, userId) => {
    // Generate a unique slug for this user's project
    const slug = await generateUniqueSlug(
        projectData.name,
        (candidateSlug) => slugExists(candidateSlug, userId)
    );

    const newProject = await createProject({
        ...projectData,
        slug,
        createdBy: userId,

        // Creator automatically becomes Owner
        members: [
            {
                user: userId,
                role: "Owner",
            },
        ],
    });

    return newProject;
};

/**
 * Get all projects where the user
 * is owner or member
 */
const getProjects = async (userId) => {
    return await findUserProjects(userId);
};

/**
 * Get a single project
 */
const getProject = async (projectId, loggedInUserId) => {
    const project = await findProjectById(projectId);

    const isOwner =
        project.createdBy._id.toString() === loggedInUserId.toString();

    const isMember = project.members.some(
        (member) =>
            member.user._id.toString() === loggedInUserId.toString()
    );

    if (!isOwner && !isMember) {
        throw new ApiError(
            403,
            "You are not authorized to view this project."
        );
    }

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return project;
};

/**
 * Update project
 */
const editProject = async (
    projectId,
    updatedData,
    loggedInUserId
) => {
    const project = await findProjectById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Only Owner can update
    authorizeProjectOwner(
        project,
        loggedInUserId
    );

    const updatedProject = await updateProject(
        projectId,
        updatedData
    );

    return updatedProject;
};

/**
 * Delete project
 */
const removeProject = async (
    projectId,
    loggedInUserId
) => {
    const project = await findProjectById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Only Owner can delete
    authorizeProjectOwner(
        project,
        loggedInUserId
    );

    await deleteProject(projectId);

    return;
};

export {
    createNewProject,
    getProjects,
    getProject,
    editProject,
    removeProject,
};