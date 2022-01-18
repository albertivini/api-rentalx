import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swagger from "swagger-ui-express";

import "../../container";

import upload from "../../../config/upload";
import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import createConnection from "../typeorm";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        status: "error",
        message: `Internal Server Error: ${err.message}`,
    });
});

export { app };
