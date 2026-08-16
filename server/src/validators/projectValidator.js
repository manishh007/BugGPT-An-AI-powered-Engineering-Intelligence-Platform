import { body } from "express-validator";

const createProjectValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Project name is required.")
        .isLength({ min: 3, max: 100 })
        .withMessage(
            "Project name must be between 3 and 100 characters."
        ),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Project description is required.")
        .isLength({ max: 500 })
        .withMessage(
            "Project description cannot exceed 500 characters."
        ),

    body("priority")
        .optional()
        .isIn([
            "Low",
            "Medium",
            "High",
        ])
        .withMessage("Invalid priority."),

    body("visibility")
        .optional()
        .isIn([
            "Private",
            "Team",
        ])
        .withMessage("Invalid visibility."),

    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array."),

    body("tags.*")
        .optional()
        .isString()
        .withMessage("Each tag must be a string.")
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage(
            "Each tag must be between 1 and 50 characters."
        ),
];

const updateProjectValidator = [
    body()
        .custom((value) => {
            const allowedFields = [
                "name",
                "description",
                "priority",
                "visibility",
                "tags",
                "status",
            ];

            const hasUpdate = allowedFields.some(
                (field) => value[field] !== undefined
            );

            if (!hasUpdate) {
                throw new Error(
                    "At least one project field must be provided for update."
                );
            }

            return true;
        }),
    body("name")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage(
            "Project name must be between 3 and 100 characters."
        ),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage(
            "Project description cannot exceed 500 characters."
        ),

    body("priority")
        .optional()
        .isIn([
            "Low",
            "Medium",
            "High",
        ])
        .withMessage("Invalid priority."),

    body("visibility")
        .optional()
        .isIn([
            "Private",
            "Team",
        ])
        .withMessage("Invalid visibility."),

    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array."),

    body("tags.*")
        .optional()
        .isString()
        .withMessage("Each tag must be a string.")
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage(
            "Each tag must be between 1 and 50 characters."
        ),

    body("status")
        .optional()
        .isIn([
            "Active",
            "Completed",
            "Archived",
        ])
        .withMessage("Invalid project status."),
];

export {
    createProjectValidator,
    updateProjectValidator,
};