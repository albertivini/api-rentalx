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

    it("should be able to create a new category", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ email: "admin@rentx.com", password: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Test",
                description: "Testing",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });

    it("should not be able to create a new category with existent name", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ email: "admin@rentx.com", password: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Test",
                description: "Testing",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    });
});
