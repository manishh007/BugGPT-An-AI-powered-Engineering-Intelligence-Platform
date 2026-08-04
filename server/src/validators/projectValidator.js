import { body } from "express-validator";

const createProjectValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Project name is required.")
        .isLength({ min: 3, max: 100 })
        .withMessage("Project name must be between 3 and 100 characters."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Project description is required.")
        .isLength({ max: 500 })
        .withMessage("Project description cannot exceed 500 characters."),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High"])
        .withMessage("Invalid priority."),

    body("visibility")
        .optional()
        .isIn(["Private", "Team"])
        .withMessage("Invalid visibility."),
];

export { createProjectValidator };