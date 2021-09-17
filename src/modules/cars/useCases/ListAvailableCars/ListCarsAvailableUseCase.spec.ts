import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    it("should be able to list all available cars", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Name Car 1",
            brand: "Brand",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1234",
        });

        const car2 = await carsRepositoryInMemory.create({
            name: "Name Car 2",
            brand: "Brand",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "AAB-1234",
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car1, car2]);
    });

    it("should be able to list all available cars by name", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Name Car 3",
            brand: "Brand",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1231",
        });

        const cars = await listCarsUseCase.execute({ name: "Name Car 3" });

        expect(cars).toEqual([car1]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Name Car 3",
            brand: "Brand2",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1231",
        });

        const cars = await listCarsUseCase.execute({ brand: "Brand2" });

        expect(cars).toEqual([car1]);
    });

    it("should be able to list all available cars by category_id", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Name Car 3",
            brand: "Brand2",
            category_id: "1234",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1231",
        });

        const cars = await listCarsUseCase.execute({ category_id: "1234" });

        expect(cars).toEqual([car1]);
    });
});
