import { body } from "express-validator";

const createBugValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Bug title is required.")
        .isLength({ min: 5, max: 150 })
        .withMessage("Bug title must be between 5 and 150 characters."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Bug description is required.")
        .isLength({ max: 2000 })
        .withMessage("Bug description cannot exceed 2000 characters."),

    body("project")
        .notEmpty()
        .withMessage("Project ID is required.")
        .isMongoId()
        .withMessage("Invalid Project ID."),

    body("priority")
        .optional()
        .isIn([
            "Low",
            "Medium",
            "High",
            "Critical",
        ])
        .withMessage("Invalid priority."),

    body("severity")
        .optional()
        .isIn([
            "Minor",
            "Major",
            "Critical",
            "Blocker",
        ])
        .withMessage("Invalid severity."),

    body("status")
        .optional()
        .isIn([
            "Open",
            "In Progress",
            "Resolved",
            "Closed",
        ])
        .withMessage("Invalid status."),

    body("assignedTo")
        .optional({ nullable: true })
        .isMongoId()
        .withMessage("Invalid assigned user ID."),
];

export {
    createBugValidator,
};