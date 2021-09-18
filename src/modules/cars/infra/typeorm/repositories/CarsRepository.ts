import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
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
            id,
            name,
            fine_amount,
            description,
            daily_rate,
            brand,
            category_id,
            license_plate,
            specifications,
        } = data;

        const car = this.repository.create({
            id,
            name,
            fine_amount,
            description,
            daily_rate,
            brand,
            category_id,
            license_plate,
            specifications,
        });

        await this.repository.save(car);

        return car;
    }

    findByLicensePlate(license_plate: string): Promise<Car> {
        return this.repository.findOne({ license_plate });
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("cars")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("cars.brand = :brand", { brand });
        }

        if (name) {
            carsQuery.andWhere("cars.name = :name", { name });
        }

        if (category_id) {
            carsQuery.andWhere("cars.category_id = :category_id", {
                category_id,
            });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }
    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);

        return car;
    }
}
