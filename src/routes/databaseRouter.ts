/*
 TODO: Missing reference to the DatabaseModel object
 */
import * as express from "express";
import {database} from "../models/databaseModel";
import LevelChecker from "../lib/levelChecker";
/* import authentication checker */

/**
 * This class contains API definitions for companies database connections.
 *
 * @history
 * | Author         | Action Performed  | Data |
 * | ---            | ---               | ---  |
 * | Davide Polonio | Create class      | 03/05/2016 |
 *
 * @author Davide Polonio
 * @copyright MIT
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
     * @description Complete constructor. Here we initialize databases routers.
     */
    constructor() {

        this.router = express.Router();
        this.checkMember = new LevelChecker(
            ["MEMBER", "ADMIN", "OWNER", "SUPERADMIN"]);
        this.checkAdmin = new LevelChecker(
            ["ADMIN", "OWNER", "SUPERADMIN"]);

        this.router.get(
            "/companies/:company_id/databases",
            this.checkMember.check,
            this.getAllDatabasesForCompany);

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
    /**
     * @api {get} /api/companies/:company_id/databases/:database_id
     * Get a stated database.
     * @apiVersion 0.1.0
     * @apiName getOneDatabase
     * @apiGroup Database
     * @apiPermission ADMIN
     *
     * @apiDescription Use this request to get the data of an existing
     * database.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} database_id The ID of the database to return.
     * @apiParam {Number} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/databases/5230
     *
     * @apiSuccess {Number} company_id The ID of the Company.
     * @apiSuccess {Number} database_id The ID of the database to update.
     * @apiSuccess {string} username The username of the used used for read
     * data from the database.
     * @apiSuccess {string} password The password of the used used for read
     * data from the database.
     * @apiSuccess {string} host The host of the database.
     * @apiSuccess {string} name The name of the database.
     * @apiSuccess {Number} port The port of the database.
     *
     * @apiError CannotFindTheDatabase It was impossible to find the requested
     * database.
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * company.
     * @apiError NoAccessRight Only authenticated admins can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "done": false,
     *       "error": "Cannot update the database"
     *     }
     */
    private getOneDatabase(request : express.Request,
                           result : express.Response) : void {
        database
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
     * @description Get all databases for the company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    /**
     * @api {put} /api/companies/:company_id/databases
     * Return a list of all the Company's databases
     * @apiVersion 0.1.0
     * @apiName getAllDatabase
     * @apiGroup Database
     * @apiPermission MEMBER
     *
     * @apiDescription Use this request to get a list of the accessible
     * database of the stated Company
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} database_id The ID of the database to update.
     * @apiParam {Number} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/databases/5230
     *
     * @apiSuccess {JSON[]} databases Please take note that this request
     * return an array which contains the requested data.
     * @apiSuccess {Number} id Database's ID.
     * @apiSuccess {string} Database's name.
     *
     * @apiError CannotFindTheDatabase It was impossible to find the requested
     * database.
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * company.
     * @apiError NoAccessRight Only authenticated members can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "done": false,
     *       "error": "Cannot find the database"
     *     }
     */
    private getAllDatabasesForCompany(request : express.Request,
                                      result : express.Response) : void {
        database
            .getAllForCompany(request.params.company_id)
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
    /**
     * @api {put} /api/companies/:company_id/databases/:database_id
     * Update a stated database.
     * @apiVersion 0.1.0
     * @apiName updateDatabase
     * @apiGroup Database
     * @apiPermission ADMIN
     *
     * @apiDescription Use this request to update an existing database.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} database_id The ID of the database to update.
     * @apiParam {Number} user_id The ID of the logged user.
     * @apiParam {string} username The username of the used used for read
     * data from the database.
     * @apiParam {string} password The password of the used used for read
     * data from the database.
     * @apiParam {string} host The host of the database.
     * @apiParam {string} name The name of the database.
     * @apiParam {Number} port The port of the database.
     * @apiParam {JSON[]} collections Array containing the collections of
     * the database.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/databases/5230
     *
     * @apiSuccess {Number} company_id The ID of the Company.
     * @apiSuccess {Number} database_id The ID of the database to update.
     * @apiSuccess {string} username The username of the used used for read
     * data from the database.
     * @apiSuccess {string} password The password of the used used for read
     * data from the database.
     * @apiSuccess {string} host The host of the database.
     * @apiSuccess {string} name The name of the database.
     * @apiSuccess {Number} port The port of the database.
     *
     * @apiError CannotRemoveTheDatabase It was impossible to find the requested
     * database.
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * company.
     * @apiError NoAccessRight Only authenticated admins can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "done": false,
     *       "error": "Cannot update the database"
     *     }
     */
    private updateDatabase(request : express.Request,
                           result : express.Response) : void {
        database
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
    /**
     * @api {delete} /api/companies/:company_id/databases/:database_id
     * Update a stated database.
     * @apiVersion 0.1.0
     * @apiName removeDatabase
     * @apiGroup Database
     * @apiPermission ADMIN
     *
     * @apiDescription Use this request to update an existing database.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} database_id The ID of the database to remove.
     * @apiParam {Number} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/databases/5230
     *
     * @apiSuccess {Number} company_id The ID of the Company.
     * @apiSuccess {Number} database_id The ID of the database to update.
     *
     * @apiError CannotCreateTheDatabase It was impossible to find the requested
     * database.
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * company.
     * @apiError NoAccessRight Only authenticated admins can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "done": false,
     *       "error": "Cannot remove the database"
     *     }
     */
    private removeDatabase(request : express.Request,
                           result : express.Response) : void {
        database
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
    /**
     * @api {post} /api/companies/:company_id/databases/
     * Create a new database.
     * @apiVersion 0.1.0
     * @apiName createDatabase
     * @apiGroup Database
     * @apiPermission ADMIN
     *
     * @apiDescription Use this request to create a new database.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} user_id The ID of the logged user.
     * @apiParam {string} username The username of the used used for read
     * data from the database.
     * @apiParam {string} password The password of the used used for read
     * data from the database.
     * @apiParam {string} host The host of the database.
     * @apiParam {string} name The name of the database.
     * @apiParam {Number} port The port of the database.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/databases/5230
     *
     * @apiSuccess {Number} company_id The ID of the Company.
     * @apiSuccess {Number} database_id The ID of the database to update.
     * @apiSuccess {string} username The username of the used used for read
     * data from the database.
     * @apiSuccess {string} password The password of the used used for read
     * data from the database.
     * @apiSuccess {string} host The host of the database.
     * @apiSuccess {string} name The name of the database.
     * @apiSuccess {Number} port The port of the database.
     *
     * @apiError CannotUpdateTheDatabase It was impossible to find the requested
     * database.
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * company.
     * @apiError NoAccessRight Only authenticated admins can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "done": false,
     *       "error": "Cannot create the database"
     *     }
     */
    private createDatabase(request : express.Request,
                           result : express.Response) : void {
        database
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
