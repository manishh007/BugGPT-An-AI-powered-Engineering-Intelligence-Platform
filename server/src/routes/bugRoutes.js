import express from "express";
import { createBugValidator } from "../validators/bugValidator.js";
import validate from "../middleware/validate.js";
import protect from "../middleware/authMiddleware.js";

import {
    createBug,
} from "../controllers/bugController.js";

const router = express.Router();

/**
 * Create Bug
 */
router.post(
    "/",
    protect,
    createBugValidator,
    validate,
    createBug
);

export default router;