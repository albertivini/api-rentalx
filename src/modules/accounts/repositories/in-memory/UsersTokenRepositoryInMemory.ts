import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserToken } from "../../infra/typeorm/entities/UserToken";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

export class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
    usersTokens: UserToken[] = [];

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id,
        });

        this.usersTokens.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        id: string,
        refresh_token: string
    ): Promise<UserToken> {
        return this.usersTokens.find(
            (userToken) =>
                userToken.user_id === id &&
                userToken.refresh_token === refresh_token
        );
    }

    async deleteById(id: string): Promise<void> {
        const userTokenIndex = this.usersTokens.findIndex(
            (userToken) => userToken.id === id
        );

        this.usersTokens.splice(userTokenIndex);
    }

    async findByRefreshToken(token: string): Promise<UserToken> {
        return this.usersTokens.find(
            (userToken) => userToken.refresh_token === token
        );
    }
}
