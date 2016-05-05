import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import {ConfigurationChooser} from "./config/configurationChooser";
import {Configuration} from "./config/configuration";
import {UserModel} from "./models/userModel";
import {DSLModel} from "./models/dslModel";
import {DatabaseModel} from "./models/databaseModel";
import {CompanyModel} from "./models/companyModel";
import {LevelChecker} from "./lib/levelChecker";
import {AuthenticationChecker} from "./lib/authenticationChecker";
import * as routes from "./routes";

// Get the current configuration
let configuration : Configuration = ConfigurationChooser.getConfig();
let user : UserModel = new UserModel(); // Get the user's model
let dsl : DSLModel = new DSLModel(); // Get the dsl's model
let database : DatabaseModel = new DatabaseModel(); // Get the database's model
let company : CompanyModel = new CompanyModel(); // Get the company's model
// Get the instance of the level checker
let lvlChecker : LevelChecker = LevelChecker.getInstance();
// Get the instance of the authentication checker
let authChecker : AuthenticationChecker = AuthenticationChecker.getInstance();

// Initializing app
let app : express.Express = express();

// Allow to get data from body in JSON format
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Middlewares' configuration
// Authenticator configuration
/*authChecker.initialize({
    secret: configuration.getServerSecret(),
    getUserFunction: user.login
});

// Level configuration
lvlChecker.initialize({
    pathToLevel: ["body"]
});*/

// DSL Checker?? todo

// Routes' require
/*app.use("/api", routes);
app.post("/api/login", authChecker.login);*/
app.post("/api/companies/:company_id/users",
    function(req : express.Request,
             res : express.Response,
             next : express.NextFunction) : void {
    authChecker.authenticate(req.body.user_id);
    next();
}, function(err : Error,
            req : express.Request,
            res : express.Response,
            next : express.NextFunction) : void {
    if (err) {
        res.status(500).send("Authenticate yourself firstly!")
    }
    lvlChecker.requireOwner(req.body.user_id);
    next();
}, function(err : Error,
            req : express.Request,
            res : express.Response,
            next : express.NextFunction) : void {
    if (err) {
        res.status(500).send("You aren't an owner!")
    }
});

app.put("/api/companies/:company_id/users/:user_id/credentials",
    function(req : express.Request,
             res : express.Response,
             next : express.NextFunction) : void {
        authChecker.authenticate(req.body.user_id);
        next();
    }, function(err : Error,
                req : express.Request,
                res : express.Response,
                next : express.NextFunction) : void {
        if (err) {
            res.status(500).send("Authenticate yourself firstly!")
        }
    }
);

app.delete("api/companies/:company_id/users/:user_id",
    function(req : express.Request,
             res : express.Response,
             next : express.NextFunction) : void {
        authChecker.authenticate(req.body.user_id);
        next();
    }, function(err : Error,
                req : express.Request,
                res : express.Response,
                next : express.NextFunction) : void {
        if (err) {
            res.status(500).send("Authenticate yourself firstly!")
        }
        lvlChecker.requireOwner(req.body.user_id);
        next();
    }, function(err : Error,
                req : express.Request,
                res : express.Response,
                next : express.NextFunction) : void {
        if (err) {
            res.status(500).send("You aren't an owner!");
        }
    }
);

app.get("/api/companies/:company_id/",
    function(req : express.Request,
             res : express.Response,
             next : express.NextFunction) : void {
        authChecker.authenticate(req.body.user_id);
        next();
    }, function(err : Error,
                req : express.Request,
                res : express.Response,
                next : express.NextFunction) : void {
        if (err) {
            res.status(500).send("Authenticate yourself firstly!")
        }
    }
);

app.put("/api/companies/:company_id/",
    function(req : express.Request,
             res : express.Response,
             next : express.NextFunction) : void {
        authChecker.authenticate(req.body.user_id);
        next();
    }, function(err : Error,
                req : express.Request,
                res : express.Response,
                next : express.NextFunction) : void {
        if (err) {
            res.status(500).send("Authenticate yourself firstly!")
        }
        lvlChecker.requireAdmin(req.body.user_id);
        next();
    }, function(err : Error,
                req : express.Request,
                res : express.Response,
                next : express.NextFunction) : void {
            res.status(500).send("You aren't an owner!");
        }
);

// Starting the server
app.set("port", process.env.PORT || 3000);
let server : http.Server = app.listen(app.get("port"), function () : void {
    console.log("Express server is listening on port " + server.address().port +
        " in " + configuration.getEnvName() + " environment.");
});
