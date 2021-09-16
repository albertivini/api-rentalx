import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function ensureAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { id } = req.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppError("User is not admin", 401);
    }

    return next();
}
