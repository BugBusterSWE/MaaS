import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as helmet from "helmet";
import ConfigurationChooser from "./config/index";
import Configuration from "./config/configuration";
import RouterFacade from "./routes/routerFacade";

// Initializing app
let app : express.Express = express();
let configuration : Configuration = ConfigurationChooser.getConfig();

// Allow to get data from body in JSON format
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set helmet for security checks
app.use(helmet());

app.use(function (req : express.Request,
                  res : express.Response,
                  next : express.NextFunction) : void {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes' require
app.use("/api", RouterFacade);

// Starting the server
app.set("port", process.env.PORT || 3000);
let server : http.Server = app.listen(app.get("port"), function () : void {
    console.log("Express server is listening on port " + server.address().port +
        " in " + configuration.getEnvName() + " environment.");
});
