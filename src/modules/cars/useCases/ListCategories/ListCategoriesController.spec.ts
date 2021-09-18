import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost", "rentx_test");

        await connection.runMigrations();

        const id = uuid();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO users ( id, name, email, password, "isAdmin", driver_license, created_at ) VALUES ('${id}', 'vini', 'admin@rentx.com', '${password}', true , '0000' ,'now()' )`
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to list all categories", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ email: "admin@rentx.com", password: "admin" });

        const { token } = responseToken.body;

        await request(app)
            .post("/categories")
            .send({
                name: "Test3",
                description: "Testing",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("id");
    });
});
