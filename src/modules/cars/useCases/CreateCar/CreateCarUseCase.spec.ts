import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });
    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            brand: "Brand",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1234",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with existent license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name Car 1",
                brand: "Brand",
                category_id: "category",
                daily_rate: 100,
                description: "Description Car",
                fine_amount: 60,
                license_plate: "ABC-1234",
            });

            await createCarUseCase.execute({
                name: "Name Car 2",
                brand: "Brand",
                category_id: "category",
                daily_rate: 100,
                description: "Description Car",
                fine_amount: 60,
                license_plate: "ABC-1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a available car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car 3",
            brand: "Brand",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1234",
        });

        expect(car.available).toBe(true);
    });
});
