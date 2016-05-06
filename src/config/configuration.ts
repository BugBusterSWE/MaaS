import MongoConnection from "./mongoConnection";

/**
 * This is the base class for the configuration hierarchy. This class
 * contains some useful information about the configuration of the
 * environment.
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Matteo Di Pirro | Create class     | 04/05/2016     |
 *
 * @author Matteo Di Pirro
 * @license MIT
 */
abstract class Configuration {
    /**
     * @description String which represents the name of the environment.
     */
    private envName : string;

    /**
     * @description Parameters used for the connection with the MongoDB database.
     */
    private mongoConnection : MongoConnection;

    /**
     * @description String which is used for the JWT token encryption.
     */
    private serverSecret : string;

    /**
     * @description Configuration constructor.
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
     * @description Getter for the environment name
     * @returns {string} The environment name
     */
    public getEnvName() : string {
      return this.envName;
    }

    /**
     * @description Getter for the MongoDB connection's parameters
     * @returns {MongoConnection} The parameters of the MongoDB connection
     */
    public getMongoConnection() : MongoConnection {
      return this.mongoConnection;
    }

    /**
     * @description Getter for the JWT token encryption string
     * @returns {string} The the JWT token encryption string
     */
    public getServerSecret() : string {
      return this.serverSecret;
    }
}

export default Configuration;
