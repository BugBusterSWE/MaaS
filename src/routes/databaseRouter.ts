import * as express from "express";
import DatabaseModel from "../models/databaseModel";
import LevelChecker from "../lib/LevelChecker";
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

class DatabaseRouter {

    /**
     * @description Express router.
     */
    private router : express.Router;

    /**
     * @description Level checker for member level.
     */
    private checkMember : LevelChecker;

    /**
     * @description Level checker for admin level.
     */
    private checkAdmin : LevelChecker;

    /**
     * @description Database model.
     */
    private databaseModel : DatabaseModel;

    /**
     * Complete constructor. Here we initialize databases routers.
     */
    constructor() {

        this.router = express.Router();
        this.databaseModel = new DatabaseModel();
        this.checkMember = new LevelChecker(
            ["MEMBER", "ADMIN", "OWNER", "SUPERADMIN"]);
        this.checkAdmin = new LevelChecker(
            ["ADMIN", "OWNER", "SUPERADMIN"]);


        this.router.get(
            "/companies/:company_id/databases",
            this.checkMember.check,
            this.getAllDatabases);
        this.router.get(
            "/companies/:company_id/databases/:database_id",
            this.checkMember.check,
            this.getOneDatabase);
        this.router.post(
            "/companies/:company_id/databases",
            this.checkAdmin.check,
            this.createDatabase);
        this.router.put(
            "/companies/:company_id/database/:database_id",
            this.checkAdmin.check,
            this.updateDatabase);
        this.router.delete(
            "/companies/:company_id/database/:database_id",
            this.checkAdmin.check,
            this.removeDatabase);
    }

    /**
     * @description Return the Express router.
     * @returns {express.Router} The Express router.
     */
    public getRouter() : express.Router {
        return this.router;
    }

    /**
     * @description Get the database represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getOneDatabase(request : express.Request,
                           result : express.Response) : void {
        this.databaseModel
            .getOne(request.params.database_id)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                result
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot find the requested database"
                    });
            });
    }

    /**
     * @description Get all databases.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getAllDatabases(request : express.Request,
                            result : express.Response) : void {
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

    /**
     * @description Update the database represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private updateDatabase(request : express.Request,
                           result : express.Response) : void {
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

    /**
     * @description Remove the database represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private removeDatabase(request : express.Request,
                           result : express.Response) : void {
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
                        message: "Cannot remove the database"
                    });
            });
    }

    /**
     * @description Create a new database.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private createDatabase(request : express.Request,
                           result : express.Response) : void {
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
                        message: "Cannot create the database"
                    });
            });
    }
}

export default DatabaseRouter;
