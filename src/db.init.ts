import { getConnectionOptions, createConnection } from "typeorm";
import { Personnel } from "./entity/personnel";

export async function dbInit() {

    const connectionOptions = await getConnectionOptions();
    await createConnection(connectionOptions);
}