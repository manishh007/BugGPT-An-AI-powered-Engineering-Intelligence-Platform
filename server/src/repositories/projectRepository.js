import Project from "../models/Project.js";

const createProject = async (projectData) => {
    return await Project.create(projectData);
};

const findProjectById = async (projectId) => {
    return await Project.findById(projectId);
};

const findAllProjects = async () => {
    return await Project.find();
};

const updateProject = async (projectId, updatedData) => {
    return await Project.findByIdAndUpdate(projectId, updatedData, {
        new: true,
        runValidators: true,
    });
};

const deleteProject = async (projectId) => {
    return await Project.findByIdAndDelete(projectId);
};

export {
    createProject,
    findProjectById,
    findAllProjects,
    updateProject,
    deleteProject,
};