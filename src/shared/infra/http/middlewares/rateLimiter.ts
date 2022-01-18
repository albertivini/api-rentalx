import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import * as redis from "redis";

import { AppError } from "../../../errors/AppError";

const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "middleware",
    points: 10,
    duration: 5,
});

export async function rateLimiter(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        await redisClient.connect();

        await limiter.consume(req.ip);

        return next();
    } catch (error) {
        throw new AppError("Too many Requests", 429);
    } finally {
        await redisClient.disconnect();
    }
}
