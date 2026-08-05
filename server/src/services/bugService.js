import {
    createBug,
    findBugById,
    findBugByBugId,
    findProjectBugs,
    updateBug,
    archiveBug,
} from "../repositories/bugRepository.js";

import { findProjectById } from "../repositories/projectRepository.js";

import ApiError from "../utils/ApiError.js";

import generateSequence from "../utils/generateSequence.js";

const createNewBug = async (
    bugData,
    loggedInUserId
) => {

    const project = await findProjectById(bugData.project);

    if (!project) {
        throw new ApiError(
            404,
            "Project not found."
        );
    }

};

const createNewBug = async (
    bugData,
    loggedInUserId
) => {

    const project = await findProjectById(bugData.project);

    if (!project) {
        throw new ApiError(
            404,
            "Project not found."
        );
    }

    const isProjectMember = project.members.some(
        (member) =>
            member.user._id.toString() ===
            loggedInUserId.toString()
    );

    if (!isProjectMember) {
        throw new ApiError(
            403,
            "You are not a member of this project."
        );
    }

    const sequence = await generateSequence(
        project._id,
        "BUG"
    );

    const bugId = `BG-${sequence}`;

    const newBugData = {
        ...bugData,
        bugId,
        reportedBy: loggedInUserId,
        labels: [...new Set(bugData.labels || [])],
    };

    const bug = await createBug(newBugData);

    return bug;

};

export {
    createNewBug,
};