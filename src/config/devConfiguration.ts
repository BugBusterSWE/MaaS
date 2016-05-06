import Configuration from "./configuration";
import MongoConnection from "./mongoConnection";
/**
 * Development configuration
 */
class DevConfiguration extends Configuration {
    /**
     * Complete constructor of the development configuration
     * @param connection The parameters for the connection to the database
     * @param serverSecret The JWT token's encryption string
     */
    constructor(connection : MongoConnection, serverSecret : string) {
      super("development", connection, serverSecret);
    }
}

export default DevConfiguration;
