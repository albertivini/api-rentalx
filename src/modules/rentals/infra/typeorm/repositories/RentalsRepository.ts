import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

@EntityRepository(Rental)
export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({
        car_id,
        expected_return_date,
        user_id,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
        });

        await this.repository.save(rental);

        return rental;
    }
    findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.repository.findOne({
            where: {
                car_id,
                end_date: null,
            },
        });
    }
    findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.repository.findOne({
            where: {
                user_id,
                end_date: null,
            },
        });
    }
}
