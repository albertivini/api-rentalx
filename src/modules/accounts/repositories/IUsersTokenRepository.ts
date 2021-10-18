import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

export interface IUsersTokenRepository {
    create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserToken>;
    findByUserIdAndRefreshToken(
        id: string,
        refresh_token: string
    ): Promise<UserToken>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(token: string): Promise<UserToken>;
}
