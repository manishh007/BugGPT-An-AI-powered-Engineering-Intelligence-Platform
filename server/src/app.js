import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "BugGPT API Running"
    });
});

app.use("/api/v1/auth", authRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;