import {
    createProject,
    findProjectById,
    findAllProjects,
    updateProject,
    deleteProject,
} from "../repositories/projectRepository.js";

import ApiError from "../utils/ApiError.js";

const createNewProject = async (projectData, userId) => {
    const newProject = await createProject({
        ...projectData,
        createdBy: userId,
        members: [userId],
    });

    return newProject;
};

const getProjects = async () => {
    return await findAllProjects();
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

