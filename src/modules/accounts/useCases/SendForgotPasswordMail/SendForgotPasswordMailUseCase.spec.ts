import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "../../repositories/in-memory/UsersTokenRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
        mailProviderInMemory = new MailProviderInMemory();
        dateProvider = new DayjsDateProvider();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokenRepositoryInMemory,
            dateProvider,
            mailProviderInMemory
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

        await usersRepositoryInMemory.create({
            email: "test@test.com",
            name: "Teste",
            password: "1234",
            driver_license: "15618915",
        });

        await sendForgotPasswordMailUseCase.execute("test@test.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("testeee@test.com")
        ).rejects.toEqual(new AppError("User does not exists"));
    });

    it("should be able to create an users token", async () => {
        const createTokenMail = jest.spyOn(
            usersTokenRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            email: "test2@test.com",
            name: "Teste",
            password: "1234",
            driver_license: "15618915",
        });

        await sendForgotPasswordMailUseCase.execute("test2@test.com");

        expect(createTokenMail).toBeCalled();
    });
});
