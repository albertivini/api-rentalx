import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO users ( id, name, email, password, "isAdmin", driver_license, created_at ) VALUES ('${id}', 'vini', 'admin@rentx.com', '${password}', true , '0000' ,'now()' )`
    );

    await connection.close();
}

create().then(() => console.log("User admin created!"));
