import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "../../../repositories/IUsersTokenRepository";
import { UserToken } from "../entities/UserToken";

@EntityRepository(UserToken)
export class UsersTokenRepository implements IUsersTokenRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const userToken = await this.repository.findOne({
            user_id: id,
            refresh_token,
        });

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
