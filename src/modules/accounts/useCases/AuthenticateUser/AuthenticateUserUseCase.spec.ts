import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();

        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );

        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "Test",
            email: "test@test.com",
            password: "1234",
            driver_license: "123456",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "test@test.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate an user with incorrect password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "Teste",
                email: "teste@test.com",
                password: "1234",
                driver_license: "1234156",
            };
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "12345",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
