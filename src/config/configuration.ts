import MongoConnection from "./mongoConnection";

/**
 * This is the base class for the configuration hierarchy. This class
 * contains some useful information about the configuration of the
 * environment.
 */
abstract class Configuration {
    /**
     * String which represents the name of the environment.
     */
    private envName : string;

    /**
     * Parameters used for the connection with the MongoDB database.
     */
    private mongoConnection : MongoConnection;

    /**
     * String which is used for the JWT token encryption.
     */
    private serverSecret : string;

    /**
     * Configuration constructor.
     * @param envName The name of the environment
     * @param connection The parameters of the MongoDB connection
     * @param serverSecret The string for the JWT token encryption.
     */
    constructor(envName : string,
                connection : MongoConnection,
                serverSecret : string) {
        this.envName = envName;
        this.mongoConnection = connection;
        this.serverSecret = serverSecret;
    }

    /**
     * Getter for the environment name
     * @returns {string} The environment name
     */
    public getEnvName() : string {
      return this.envName;
    }

    /**
     * Getter for the MongoDB connection's parameters
     * @returns {MongoConnection} The parameters of the MongoDB connection
     */
    public getMongoConnection() : MongoConnection {
      return this.mongoConnection;
    }

    /**
     * Getter for the JWT token encryption string
     * @returns {string} The the JWT token encryption string
     */
    public getServerSecret() : string {
      return this.serverSecret;
    }
}

export default Configuration;
