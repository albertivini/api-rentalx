import "reflect-metadata";
import express from "express";
import swagger from "swagger-ui-express";

import "./database";

import "./shared/container";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running!"));
