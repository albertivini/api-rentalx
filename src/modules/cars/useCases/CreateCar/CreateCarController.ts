import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {
            brand,
            daily_rate,
            description,
            fine_amount,
            name,
            license_plate,
            category_id,
        } = req.body;

        const createCarUseCase = container.resolve(CreateCarUseCase);

        const car = await createCarUseCase.execute({
            brand,
            daily_rate,
            description,
            fine_amount,
            name,
            license_plate,
            category_id,
        });

        return res.status(201).json(car);
    }
}
