import MongoConnection from "./mongoConnection";
import Configuration from "./configuration";
import DevConfiguration from "./devConfiguration";
import TestConfiguration from "./testConfiguration";
import ProdConfiguration from "./prodConfiguration";

/**
 * @description Class used for get the necessary configuration.
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Matteo Di Pirro | Create class     | 04/05/2016     |
 *
 * @author Matteo Di Pirro
 * @license MIT
 */
class ChooseConfiguration {

    /**
     * @description Return the right configuration according to the Node.js
     * environment variable. It may be: 'development', 'test' or 'production'.
     * The default configuration is the 'production' one.
     * @returns {Configuration} The configuration.
     */
    public static getConfig() : Configuration {
        /** @todo parameters */
        let connection : MongoConnection = new MongoConnection(
            "admin",
            "admin",
            "ds013250.mlab.com",
            13250,
            "mongocbtest"
        );
        let serverSecret : string = "serverSecret";
        let config : Configuration;

        // Export the right configurations according to the NODE_ENV variable
        switch (process.env.NODE_ENV) {
            case "development":
                config = new DevConfiguration(connection, serverSecret);
                break;
            case "test":
                config = new TestConfiguration(connection, serverSecret);
                break;
            case "production":
                config = new ProdConfiguration(connection, serverSecret);
                break;
            default:
                config = new ProdConfiguration(connection, serverSecret);
                break;
        }
        return config;
    }
}

export default ChooseConfiguration;
