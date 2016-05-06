import MongoConnection from "./mongoConnection";
import Configuration from "./configuration";
import DevConfiguration from "./devConfiguration";
import TestConfiguration from "./testConfiguration";
import ProdConfiguration from "./prodConfiguration";

/**
 * Class used for get the necessary configuration
 */
class ChooseConfiguration {
    public static getConfig() : Configuration {
        // Todo parameters
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
