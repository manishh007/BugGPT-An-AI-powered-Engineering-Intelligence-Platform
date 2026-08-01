import asyncHandler from "../utils/asyncHandler.js";

import {
    createNewProject,
    getProjects,
    getProject,
    editProject,
    removeProject,
} from "../services/projectService.js";

const createProject = asyncHandler(async (req, res) => {
    const project = await createNewProject(req.body, req.user._id);

    res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project,
    });
});

const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await getProjects(req.user._id);

    res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
    });
});

const getProjectById = asyncHandler(async (req, res) => {
    const project = await getProject(req.params.id);

    res.status(200).json({
        success: true,
        data: project,
    });
});

const updateProject = asyncHandler(async (req, res) => {
    const project = await editProject(req.params.id, req.body);

    res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: project,
    });
});

const deleteProject = asyncHandler(async (req, res) => {
    await removeProject(req.params.id);

    res.status(200).json({
        success: true,
        message: "Project deleted successfully",
    });
});

export {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};