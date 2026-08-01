import {
    createProject,
    findProjectById,
    findUserProjects,
    updateProject,
    deleteProject,
    findProjectBySlug,
} from "../repositories/projectRepository.js";

import ApiError from "../utils/ApiError.js";

const createNewProject = async (projectData, userId) => {

    const existingProject = await findProjectBySlug(
        projectData.name,
        userId
    );

    if (existingProject) {
        throw new ApiError(
            409,
            "Project with this name already exists."
        );
    }

    const newProject = await createProject({
        ...projectData,
        createdBy: userId,
        members: [
            {
                user: userId,
                role: "Owner",
            },
        ],
    });

    return newProject;
};

const getProjects = async (userId) => {
    return await findUserProjects(userId);
};

const getProject = async (projectId) => {
    const project = await findProjectById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return project;
};

const editProject = async (projectId, updatedData) => {
    const updatedProject = await updateProject(projectId, updatedData);

    if (!updatedProject) {
        throw new ApiError(404, "Project not found");
    }

    return updatedProject;
};

const removeProject = async (projectId) => {
    const deletedProject = await deleteProject(projectId);

    if (!deletedProject) {
        throw new ApiError(404, "Project not found");
    }

    return deletedProject;
};

export {
    createNewProject,
    getProjects,
    getProject,
    editProject,
    removeProject,
};

