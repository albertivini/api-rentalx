import { inject, injectable } from "tsyringe";

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
        private usersRepository: IUsersRepository
    ) {}

    async execute({ user_id, avatarFile }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (user.avatar) {
            // apaga arquivo antigo
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        // salva o novo
        user.avatar = avatarFile;

        await this.usersRepository.create(user);
    }
}
