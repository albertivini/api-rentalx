import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "./User";

@Entity("users_tokens")
export class UserToken {
    @PrimaryColumn()
    id: string;

    @Column({ name: "refres_token" })
    refresh_token: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
