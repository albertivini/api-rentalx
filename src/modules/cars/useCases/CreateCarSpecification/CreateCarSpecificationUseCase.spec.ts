import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("should be able to add a new specification to car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            brand: "Brand",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1234",
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: "spec",
            description: "test spec",
        });

        const SpecificationCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [specification.id],
        });

        expect(SpecificationCars).toHaveProperty("specifications");
        // expect(SpecificationCars.specifications.length).toBe(1);
    });

    it("should not be able to add a new specification to car does not exists", async () => {
        const car_id = "1234";
        const specifications_id = ["54321"];

        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            })
        ).rejects.toEqual(new AppError("Car does not exists"));
    });
});
