import asyncHandler from "../utils/asyncHandler.js";

import {
    createNewBug,
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

export {
    createBug,
};