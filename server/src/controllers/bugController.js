import asyncHandler from "../utils/asyncHandler.js";

import {
    createNewBug,
    getBugsByProject,
    getBug,
    editBug,
    removeBug,
    analyzeBug,
} from "../services/bugService.js";

const createBug = asyncHandler(async (req, res) => {

    const bug = await createNewBug(
        req.body,
        req.user._id
    );

    res.status(201).json({
        success: true,
        message: "Bug created successfully.",
        data: bug,
    });

});

const getProjectBugs = asyncHandler(async (req, res) => {

    const bugs = await getBugsByProject(
        req.params.projectId,
        req.user._id
    );

    res.status(200).json({
        success: true,
        count: bugs.length,
        data: bugs,
    });

});

const getBugById = asyncHandler(async (req, res) => {

    const bug = await getBug(
        req.params.id,
        req.user._id
    );

    res.status(200).json({
        success: true,
        data: bug,
    });

});

const analyzeBugWithAI = asyncHandler(
    async (req, res) => {
        const bug = await analyzeBug(
            req.params.id,
            req.user._id
        );

        res.status(200).json({
            success: true,
            message: "Bug analyzed successfully.",
            data: bug,
        });
    }
);

const updateBug = asyncHandler(async (req, res) => {

    const bug = await editBug(
        req.params.id,
        req.body,
        req.user._id
    );

    res.status(200).json({
        success: true,
        message: "Bug updated successfully.",
        data: bug,
    });

});

const deleteBug = asyncHandler(async (req, res) => {

    await removeBug(
        req.params.id,
        req.user._id
    );

    res.status(200).json({
        success: true,
        message: "Bug archived successfully.",
    });

});

export {
    createBug,
    getProjectBugs,
    getBugById,
    updateBug,
    deleteBug,
    analyzeBugWithAI,
};