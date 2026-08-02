import ApiError from "./ApiError.js";

const authorizeProjectOwner = (project, userId) => {
    if (!project) {
        throw new ApiError(404, "Project not found.");
    }

    if (project.createdBy._id.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to perform this action."
        );
    }
};

export default authorizeProjectOwner;