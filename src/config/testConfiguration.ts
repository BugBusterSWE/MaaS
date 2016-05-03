import {Configuration} from "configuration";
import {MongoConnection} from "mongoConnection";

/**
 * Test configuration
 */
export class TestConfiguration extends Configuration {
    /**
     * Complete constructor of the development configuration
     * @param connection The parameters for the connection to the database
     * @param serverSecret The JWT token's encryption string
     */
    constructor(connection : MongoConnection, serverSecret : string) {
      super("test", connection, serverSecret);
    }
}
