import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
export class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @JoinColumn({ name: "category_id" })
    @ManyToOne(() => Category)
    category: Category;

    @Column()
    category_id: string;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specification_cars",
        joinColumn: { name: "car_id" },
        inverseJoinColumn: { name: "specification_id" },
    })
    specifications: Specification[];

    @Column()
    available: boolean;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.available = true;
        }
    }
}
