import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

@injectable()
export class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        name,
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
    }: ICreateCarDTO): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(
            license_plate
        );

        if (carAlreadyExists) {
            throw new AppError("Car already exists.");
        }

        const car = await this.carsRepository.create({
            name,
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
        });

        return car;
    }
}
