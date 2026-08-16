import express from "express";
import { createProjectValidator, updateProjectValidator } from "../validators/projectValidator.js";
import validate from "../middleware/validate.js";
import protect from "../middleware/authMiddleware.js";
// import {  } from "../validators/projectValidator.js";

import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post(
    "/",
    protect,
    createProjectValidator,
    validate,
    createProject
);

router.get("/", protect, getAllProjects);

router.get("/:id", protect, getProjectById);

router.put(
    "/:id",
    protect,
    updateProjectValidator,
    validate,
    updateProject
);

router.delete("/:id", protect, deleteProject);

export default router;