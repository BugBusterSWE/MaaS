import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import ConfigurationChooser from "./config/configurationChooser";
import Configuration from "./config/configuration";
import * as routes from "./routes/routerFacade";

// Initializing app
let app : express.Express = express();
let configuration : Configuration = ConfigurationChooser.getConfig();

// Allow to get data from body in JSON format
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes' require
app.use("/api", routes);

// Starting the server
app.set("port", process.env.PORT || 3000);
let server : http.Server = app.listen(app.get("port"), function () : void {
    console.log("Express server is listening on port " + server.address().port +
        " in " + configuration.getEnvName() + " environment.");
});
