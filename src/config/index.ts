import {Configuration} from "configuration";
import {DevConfiguration} from "devConfiguration";
import {ProdConfiguration} from "prodConfiguration";
import {TestConfiguration} from "testConfiguration";

/**
 * Class used for get the necessary configuration
 */
export class ChooseConfiguration {
    public static getConfig() : Configuration {
        // Todo parameters
        let connection : MongoConnection = new MongoConnection(
            "user",
            "password",
            "host",
            "name");
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
