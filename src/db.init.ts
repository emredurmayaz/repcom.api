import { getConnectionOptions, createConnection } from "typeorm";

export async function dbInit() {

    const connectionOptions = await getConnectionOptions();
    await createConnection(connectionOptions);
}