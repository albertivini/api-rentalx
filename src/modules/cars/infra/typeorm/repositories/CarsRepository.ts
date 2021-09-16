import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "../../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

@EntityRepository(Car)
export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }
    async create(data: ICreateCarDTO): Promise<Car> {
        const {
            name,
            fine_amount,
            description,
            daily_rate,
            brand,
            category_id,
            license_plate,
        } = data;

        const car = this.repository.create({
            name,
            fine_amount,
            description,
            daily_rate,
            brand,
            category_id,
            license_plate,
        });

        await this.repository.save(car);

        return car;
    }

    findByLicensePlate(license_plate: string): Promise<Car> {
        return this.repository.findOne({ license_plate });
    }
}
