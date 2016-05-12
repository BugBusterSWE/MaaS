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

    private router : express.Router = express.Router();
    private databaseModel = new DatabaseModel();

    constructor() {
        this.router.get(
            "/companies/:company_id/databases",
            this.getAllDatabases);
        this.router.get(
            "/companies/:company_id/databases/:database_id",
            this.getOneDatabase);
        this.router.post(
            "/companies/:company_id/databases",
            this.createDatabase);
        this.router.put(
            "/companies/:company_id/database/:database_id",
            this.updateDatabase);
        this.router.delete(
            "/companies/:company_id/database/:database_id",
            this.removeDatabase);
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

    private removeDatabase(request : express.Request, response : express.Resolve) : void {
        this.databaseModel
            .remove(request.params.database_id)
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
                        message: "Cannot remove the databases"
                    });
            });
    }


    private createDatabase(request : express.Request, response : express.Response) : void {
        this.databaseModel
            .create(request.body)
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
                        message: "Cannot create the databases"
                    });
            });
    }
}
