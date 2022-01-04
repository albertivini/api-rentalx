import { Connection, createConnection, getConnectionOptions } from "typeorm";

// interface IOptions {
//     host: string;
// }

// getConnectionOptions().then((options) => {
//     const newOptions = options as IOptions;

//     newOptions.host = "database_ignite";

//     createConnection({
//         ...options,
//     });
// });

// export default async (
//     host = "database_ignite",
//     database = "rentx"
// ): Promise<Connection> => {
//     const defaultOptions = await getConnectionOptions();

//     return createConnection(
//         Object.assign(defaultOptions, {
//             host,
//             database,
//         })
//     );
// };

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === "test"
                    ? "rentx"
                    : defaultOptions.database,
        })
    );
};
