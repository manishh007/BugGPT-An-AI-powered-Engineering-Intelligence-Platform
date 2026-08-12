import {
    createComment,
    findBugComments,
    findCommentById,
    updateComment,
    deleteComment,
} from "../repositories/commentRepository.js";

import { findBugById } from "../repositories/bugRepository.js";
import { findProjectById } from "../repositories/projectRepository.js";

import ApiError from "../utils/ApiError.js";

/**
 * Check whether a user belongs to the bug's project
 */
const authorizeBugMember = async (
    bug,
    userId
) => {
    const project = await findProjectById(
        bug.project._id
    );

    if (!project) {
        throw new ApiError(
            404,
            "Project not found."
        );
    }

    const isMember = project.members.some(
        (member) =>
            member.user._id.toString() ===
            userId.toString()
    );

    if (!isMember) {
        throw new ApiError(
            403,
            "You are not a member of this project."
        );
    }

    return project;
};

/**
 * Create a comment
 */
const createNewComment = async (
    bugId,
    content,
    loggedInUserId
) => {
    const bug = await findBugById(bugId);

    if (!bug) {
        throw new ApiError(
            404,
            "Bug not found."
        );
    }

    await authorizeBugMember(
        bug,
        loggedInUserId
    );

    if (bug.isArchived) {
        throw new ApiError(
            400,
            "Archived bugs cannot receive comments."
        );
    }

    return await createComment({
        bug: bugId,
        user: loggedInUserId,
        content,
    });
};

/**
 * Get all comments for a bug
 */
const getComments = async (
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

    await authorizeBugMember(
        bug,
        loggedInUserId
    );

    return await findBugComments(bugId);
};

/**
 * Get one comment
 */
const getComment = async (
    commentId,
    loggedInUserId
) => {
    const comment = await findCommentById(
        commentId
    );

    if (!comment) {
        throw new ApiError(
            404,
            "Comment not found."
        );
    }

    const bug = await findBugById(
        comment.bug._id
    );

    if (!bug) {
        throw new ApiError(
            404,
            "Bug not found."
        );
    }

    await authorizeBugMember(
        bug,
        loggedInUserId
    );

    return comment;
};

/**
 * Update comment
 */
const editComment = async (
    commentId,
    content,
    loggedInUserId
) => {
    const comment = await findCommentById(
        commentId
    );

    if (!comment) {
        throw new ApiError(
            404,
            "Comment not found."
        );
    }

    if (
        comment.user._id.toString() !==
        loggedInUserId.toString()
    ) {
        throw new ApiError(
            403,
            "You can only edit your own comments."
        );
    }

    const updatedComment =
        await updateComment(
            commentId,
            { content }
        );

    return updatedComment;
};

/**
 * Delete comment
 */
const removeComment = async (
    commentId,
    loggedInUserId
) => {
    const comment = await findCommentById(
        commentId
    );

    if (!comment) {
        throw new ApiError(
            404,
            "Comment not found."
        );
    }

    if (
        comment.user._id.toString() !==
        loggedInUserId.toString()
    ) {
        throw new ApiError(
            403,
            "You can only delete your own comments."
        );
    }

    await deleteComment(commentId);
};

export {
    createNewComment,
    getComments,
    getComment,
    editComment,
    removeComment,
};