import Project from "../models/Project.js";

const createProject = async (projectData) => {
    return await Project.create(projectData);
};

const findProjectById = async (projectId) => {
    return await Project.findById(projectId);
};

const findUserProjects = async (userId) => {
    return await Project.find({
        $or: [
            { createdBy: userId },
            { "members.user": userId },
        ],
    })
        .populate("createdBy", "name email role")
        .populate("members", "name email role")
        .sort({ createdAt: -1 });
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

const findProjectByName = async (projectName, userId) => {
    return await Project.findOne({
        name: projectName,
        createdBy: userId,
    });
};

export {
    createProject,
    findProjectById,
    findUserProjects,
    updateProject,
    deleteProject,
    findProjectByName
};