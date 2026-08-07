import {
    createBug,
    findBugById,
    findBugByBugId,
    findProjectBugs,
    updateBug,
    archiveBug,
} from "../repositories/bugRepository.js";
import authorizeBugUpdate from "../utils/authorizeBugUpdate.js";
import { findProjectById } from "../repositories/projectRepository.js";
import generateReadableId from "../utils/generateReadableId.js";
import ApiError from "../utils/ApiError.js";
import generateSequence from "../utils/generateSequence.js";
import authorizeProjectOwner from "../utils/authorizeProject.js";

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

    const bugId = generateReadableId(
        "BG",
        sequence
    );

    const newBugData = {
        ...bugData,
        bugId,
        reportedBy: loggedInUserId,
        labels: [...new Set((bugData.labels || []).map(label => label.toLowerCase()))],
    };

    const bug = await createBug(newBugData);

    return bug;

};

const getBugsByProject = async (
    projectId,
    loggedInUserId
) => {

    // Check if project exists
    const project = await findProjectById(projectId);

    if (!project) {
        throw new ApiError(
            404,
            "Project not found."
        );
    }

    // Check if user belongs to project
    const isProjectMember = project.members.some(
        (member) =>
            member.user._id.toString() ===
            loggedInUserId.toString()
    );

    if (!isProjectMember) {
        throw new ApiError(
            403,
            "You are not authorized to view these bugs."
        );
    }

    return await findProjectBugs(projectId);
};

const getBug = async (
    bugId,
    loggedInUserId
) => {

    const bug = await findBugById(bugId);

    if (!bug) {
        throw new ApiError(
            404,
            "Bug not found."
        );
    }

    const project = await findProjectById(
        bug.project._id
    );

    const isProjectMember = project.members.some(
        (member) =>
            member.user._id.toString() ===
            loggedInUserId.toString()
    );

    if (!isProjectMember) {
        throw new ApiError(
            403,
            "You are not authorized to view this bug."
        );
    }

    return bug;
};

const editBug = async (
    bugId,
    updatedData,
    loggedInUserId
) => {

    const bug = await findBugById(bugId);

    if (!bug) {
        throw new ApiError(
            404,
            "Bug not found."
        );
    }

    authorizeBugUpdate(
        bug,
        loggedInUserId
    );

    const allowedUpdates = {
        title: updatedData.title,
        description: updatedData.description,
        status: updatedData.status,
        priority: updatedData.priority,
        severity: updatedData.severity,
        assignedTo: updatedData.assignedTo,
        environment: updatedData.environment,
        reproductionSteps: updatedData.reproductionSteps,
        expectedResult: updatedData.expectedResult,
        actualResult: updatedData.actualResult,
        labels: updatedData.labels
            ? [...new Set(updatedData.labels.map(label => label.toLowerCase()))]
            : undefined,
    };

    if (allowedUpdates.status === "Resolved") {
        allowedUpdates.resolvedAt = new Date();
    }

    if (
        allowedUpdates.status &&
        allowedUpdates.status !== "Resolved"
    ) {
        allowedUpdates.resolvedAt = null;
    }

    // Remove undefined fields
    Object.keys(allowedUpdates).forEach((key) => {
        if (allowedUpdates[key] === undefined) {
            delete allowedUpdates[key];
        }
    });

    const updatedBug = await updateBug(
        bugId,
        allowedUpdates
    );

    return updatedBug;
};

const removeBug = async (
    bugId,
    loggedInUserId
) => {

    const bug = await findBugById(bugId);

    if (!bug) {
        throw new ApiError(
            404,
            "Bug not found."
        );
    }

    authorizeProjectOwner(
        bug.project,
        loggedInUserId
    );

    await archiveBug(bugId);

};

export {
    createNewBug,
    getBugsByProject,
    getBug,
    editBug,
    removeBug,
};