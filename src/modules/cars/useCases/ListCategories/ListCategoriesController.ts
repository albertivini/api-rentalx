import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

    handle(req: Request, res: Response): Response {
        const data = this.listCategoriesUseCase.execute();

        return res.status(200).json(data);
    }
}
