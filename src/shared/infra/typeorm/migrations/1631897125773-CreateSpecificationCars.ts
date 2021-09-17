import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateSpecificationCars1631897125773
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "specification_cars",
                columns: [
                    {
                        name: "car_id",
                        type: "uuid",
                    },
                    {
                        name: "specification_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "specification_cars",
            new TableForeignKey({
                name: "FKSpecificationCar",
                columnNames: ["specification_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "specifications",
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "specification_cars",
            new TableForeignKey({
                name: "FKCarSpecification",
                columnNames: ["car_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "cars",
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            "specification_cars",
            "FKCarSpecification"
        );

        await queryRunner.dropForeignKey(
            "specification_cars",
            "FKSpecificationCar"
        );

        await queryRunner.dropTable("specification_cars");
    }
}
