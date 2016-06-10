import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as helmet from "helmet";
import ConfigurationChooser from "./config/index";
import Configuration from "./config/configuration";
import RouterFacade from "./routes/routerFacade";
import MongoConnection from "./config/mongoConnection";

/**
 * <p>This is the class that starts MaaS. This class can accept a custom database
 * that is useful for testing purpose. It can be also configurated a custom port
 * in order to run MaaS in a different port.</p>
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Davide Polonio | Transformed script into a class | 09/06/2016 | 
 * | Matteo Di Pirro | Create script     | 04/05/2016     |
 *
 * @author Matteo Di Pirro
 * @license MIT
 */
class MaaS {

    private app : express.Express;
    private configuration : Configuration;
    private server : http.Server;

    /**
     * @description Default constructor that initialize MaaS.
     * @param customDB {MongoConnection}
     * Optional parameter
     * @param port {number}
     * Optional parameter
     * @return {MaaS}
     */
    constructor(customDB? : MongoConnection, port? : number) {

           this.app = express();

           this.configuration = ConfigurationChooser.getConfig(customDB);

           port = port || 3000;

           // Allow to get data from body in JSON format
           this.app.use(bodyParser.urlencoded({extended: true}));
           this.app.use(bodyParser.json());

           // Set helmet for security checks
           this.app.use(helmet());

           this.app.use(function (req : express.Request,
                             res : express.Response,
                             next : express.NextFunction) : void {
                 res.header("Access-Control-Allow-Origin", "*");
                 res.header("Access-Control-Allow-Headers",
                     "Origin, X-Requested-With, Content-Type, Accept");
                 next();
           });

           // Routes' require
           this.app.use("/api", RouterFacade);

           this.app.use(
               "/",
               express.static(`${__dirname}/public/static`)
           );
           this.app.use(
               "/bundle.js",
               express.static(`${__dirname}/public/bundle.js`)
           );

           // Starting the server
           this.app.set("port", process.env.PORT || port);

    }

    /**
     * @description This method will start MaaS on the configured port
     */
    public run () : void {

        this.server = this.app.listen(this.app.get("port"), () => {
        console.log("Express server is listening on port " +
        this.server.address().port + " in " + this.configuration.getEnvName() +
        " environment.");
        });
    }

    /**
     * @description <p>This method will stop MaaS. MaaS will not reply anymore 
     * on the configured port.</p>
     */
    public stop() : void {

        this.server.close();
    }
}

export default MaaS;
