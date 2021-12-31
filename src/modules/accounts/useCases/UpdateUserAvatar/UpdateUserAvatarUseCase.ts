import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ user_id, avatarFile }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, "avatar");
        }

        // salva o novo
        user.avatar = avatarFile;
        await this.storageProvider.save(avatarFile, "avatar");

        await this.usersRepository.create(user);
    }
}
