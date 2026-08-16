import ApiError from "./ApiError.js";

const authorizeBugUpdate = (
    bug,
    loggedInUserId
) => {
    const isOwner =
        bug.project.createdBy.toString() ===
        loggedInUserId.toString();

    const isReporter =
        bug.reportedBy._id.toString() ===
        loggedInUserId.toString();

    const isAssignedDeveloper =
        bug.assignedTo &&
        bug.assignedTo._id.toString() ===
        loggedInUserId.toString();

    if (
        !isOwner &&
        !isReporter &&
        !isAssignedDeveloper
    ) {
        throw new ApiError(
            403,
            "You are not authorized to update this bug."
        );
    }

};

export default authorizeBugUpdate;