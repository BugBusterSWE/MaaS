import * as express from "express";
import {DatabaseModel} from "../models/databaseModel";
/* import authentication checker */

/**
 * This class contains API definitions for companies database connections.
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Davide Polonio | Create class | 03/05/2016 |
 *
 * @author Davide Polonio
 * @copyright MIT
 *
 *
 * @todo Missing reference to the DatabaseModel object
 *
 */

export default class DatabaseRouter {

    private router : express
:
    express
.
    Router = express.Router();
    private databaseModel = new DatabaseModel();

    constructor() {

    }

    public getRouter() : express.Router {
        return this.router;
    }

    private getOneDatabase(request : express.Request, result : express.Result) : void {
        this.databaseModel
            .getOne(reqest.params.database_id)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                result
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot find the request database"
                    });
            });
    }

    private getAllDatabases(request : express.Request, result : express.Result) : void {
        this.databaseModel
            .getAll()
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                result
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot find the databases"
                    });
            });
    }


    private updateDatabase(request : express.Request, response : express.Response) : void {
        this.databaseModel
            .update(request.params.database_id, request.body)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                result
                // Todo : set the status
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot modify the databases"
                    });
            });
    }
    
    private removeDatabase( request : express.Request, response : express.Resolve ) : void {
        
    }

}

class DatabaseRouterX {

    /**
     * @description Personal router for the class. The class load request here.
     */
    private routerRef : express.Router;

    /**
     * @description Public constructor.
     *
     * @return {DatabaseRouter}
     */
    constructor() {

        this.routerRef = express.Router();

        this.createGetRouter();
    }

    public getRouter() : express.Router {

        return this.routerRef;
    }

    private createGetRouter() : void {

        this.routerRef.get("/api/companies/:company_id/databases",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {

                let idUser : number = req.body[0];

                /*
                 * Here I use authentication checker and I need to check
                 * the user level.
                 * 1 - Call authentication checker as class .authenticate
                 *     authenticationChecker.authenticate() -> returns a boolean
                 *
                 *     If the boolean returned is `false` the user
                 *     hasn't right permission and so I raise a error and
                 *     I have to call next with the error.
                 *
                 * 2 - See 1 but with level checker. The minimum is MEMBER.
                 *     If > MEMBER I query the database.
                 */


                /* Get the id of the database to query
                 * This need noImplicitAny: false
                 */
                let companyId : number = req.param[0];

                // Query the database

                // If something goes wrong, call next()
                next(/*new Error("description")*/);
            });
    }

}
