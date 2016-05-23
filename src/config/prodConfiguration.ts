import Configuration from "./configuration";
import MongoConnection from "./mongoConnection";

/**
 * Production configuration.
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Matteo Di Pirro | Create class     | 04/05/2016     |
 *
 * @author Matteo Di Pirro
 * @license MIT
 */
class ProdConfiguration extends Configuration {
    /**
     * @description Complete constructor of the development configuration
     * @param connection The parameters for the connection to the database
     * @param serverSecret The JWT token's encryption string
     */
    constructor(connection : MongoConnection, serverSecret : string) {
      super("production", connection, serverSecret);
    }
}

export default ProdConfiguration;

