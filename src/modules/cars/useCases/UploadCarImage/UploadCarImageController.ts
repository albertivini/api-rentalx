import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
    filename: string;
}

export class UploadCarImageController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        // tem que ser o mesmo nome do middleware que ta em formato string na rota
        const images = req.files as IFiles[];

        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

        const images_name = images.map((file) => file.filename);

        await uploadCarImageUseCase.execute({
            car_id: id,
            images_name,
        });

        return res.status(201).send();
    }
}
