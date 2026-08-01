import {
    createProject,
    findProjectById,
    findUserProjects,
    updateProject,
    deleteProject,
    slugExists,
} from "../repositories/projectRepository.js";

import ApiError from "../utils/ApiError.js";
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
const getProject = async (projectId) => {
    const project = await findProjectById(projectId);

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
    if (project.createdBy.toString() !== loggedInUserId.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to update this project."
        );
    }

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
    if (project.createdBy.toString() !== loggedInUserId.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to delete this project."
        );
    }

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