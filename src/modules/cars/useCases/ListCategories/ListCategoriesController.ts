import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const data = await listCategoriesUseCase.execute();

        return res.status(200).json(data);
    }
}
