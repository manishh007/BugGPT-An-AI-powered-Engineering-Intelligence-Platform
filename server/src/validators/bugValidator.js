import { body } from "express-validator";

const createBugValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Bug title is required.")
        .isLength({ min: 5, max: 150 })
        .withMessage(
            "Bug title must be between 5 and 150 characters."
        ),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Bug description is required.")
        .isLength({ max: 2000 })
        .withMessage(
            "Bug description cannot exceed 2000 characters."
        ),

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

    body("labels")
        .optional()
        .isArray()
        .withMessage("Labels must be an array."),

    body("labels.*")
        .optional()
        .isString()
        .withMessage("Each label must be a string.")
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage(
            "Each label must be between 1 and 50 characters."
        ),

    body("reproductionSteps")
        .optional()
        .isArray()
        .withMessage(
            "Reproduction steps must be an array."
        ),

    body("reproductionSteps.*")
        .optional()
        .isString()
        .withMessage(
            "Each reproduction step must be a string."
        )
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage(
            "Each reproduction step must be between 1 and 500 characters."
        ),

    body("environment")
        .optional()
        .isObject()
        .withMessage(
            "Environment must be an object."
        ),

    body("environment.browser")
        .optional()
        .isString()
        .withMessage(
            "Browser must be a string."
        )
        .trim(),

    body("environment.operatingSystem")
        .optional()
        .isString()
        .withMessage(
            "Operating system must be a string."
        )
        .trim(),

    body("environment.appVersion")
        .optional()
        .isString()
        .withMessage(
            "App version must be a string."
        )
        .trim(),
];

const updateBugValidator = [
    body("title")
        .optional()
        .trim()
        .isLength({ min: 5, max: 150 })
        .withMessage(
            "Bug title must be between 5 and 150 characters."
        ),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage(
            "Bug description cannot exceed 2000 characters."
        ),

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

    body("labels")
        .optional()
        .isArray()
        .withMessage("Labels must be an array."),

    body("labels.*")
        .optional()
        .isString()
        .withMessage("Each label must be a string.")
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage(
            "Each label must be between 1 and 50 characters."
        ),

    body("reproductionSteps")
        .optional()
        .isArray()
        .withMessage(
            "Reproduction steps must be an array."
        ),

    body("reproductionSteps.*")
        .optional()
        .isString()
        .withMessage(
            "Each reproduction step must be a string."
        )
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage(
            "Each reproduction step must be between 1 and 500 characters."
        ),

    body("environment")
        .optional()
        .isObject()
        .withMessage(
            "Environment must be an object."
        ),

    body("environment.browser")
        .optional()
        .isString()
        .withMessage("Browser must be a string.")
        .trim(),

    body("environment.operatingSystem")
        .optional()
        .isString()
        .withMessage(
            "Operating system must be a string."
        )
        .trim(),

    body("environment.appVersion")
        .optional()
        .isString()
        .withMessage("App version must be a string.")
        .trim(),
];

export {
    createBugValidator,
    updateBugValidator,
};