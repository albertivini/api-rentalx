import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            brand: "brand",
            category_id: "1234",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create new rental if there is another rental open to same user", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            brand: "brand",
            category_id: "1234",
        });

        const car2 = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Test",
            daily_rate: 100,
            license_plate: "teseet",
            fine_amount: 40,
            brand: "brand",
            category_id: "1234",
        });

        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car2.id,
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: car.id,
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError("There is a rental in progress for user")
        );
    });

    it("should not be able to create new rental to a car in use", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            brand: "brand",
            category_id: "1234",
        });

        await createRentalUseCase.execute({
            user_id: "12312",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: car.id,
                expected_return_date: new Date(),
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("should not be able to create new rental with a invalid return time", async () => {
        expect(
            createRentalUseCase.execute({
                user_id: "123123",
                car_id: "124124",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time"));
    });
});
