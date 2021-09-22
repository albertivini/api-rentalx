import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

export class ListRentalsByUserController {
    async handle(req: Request, res: Response) {
        const { id } = req.user;

        const listRentalsByUserUseCase = container.resolve(
            ListRentalsByUserUseCase
        );

        const rental = await listRentalsByUserUseCase.execute(id);

        return res.status(200).json(rental);
    }
}
