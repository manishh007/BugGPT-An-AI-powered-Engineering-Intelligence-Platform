import ApiError from "./ApiError.js";

const authorizeBugUpdate = (
    bug,
    loggedInUserId
) => {

    console.log("Project:", bug.project);
    console.log("CreatedBy:", bug.project?.createdBy);
    console.log("ReportedBy:", bug.reportedBy);
    console.log("AssignedTo:", bug.assignedTo);

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