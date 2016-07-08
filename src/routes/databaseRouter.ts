import * as express from "express";
import {database} from "../models/databaseModel";
import {authenticator} from "../lib/authenticationChecker";
import {
    checkSuperAdmin,
    checkInsideCompany,
    checkAdmin,
    checkOwner
} from "../lib/standardMiddlewareChecks";

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
     * @description Complete constructor. Here we initialize databases routers.
     */
    constructor() {

        this.router = express.Router();

        this.router.get(
            "/companies/:company_id/databases",
            authenticator.authenticate,
            checkInsideCompany,
            this.getAllDatabasesForCompany);

        this.router.get(
            "/companies/:company_id/databases/:database_id",
            authenticator.authenticate,
            checkInsideCompany,
            this.getOneDatabase);

        this.router.post(
            "/companies/:company_id/databases",
            authenticator.authenticate,
            checkAdmin,
            checkInsideCompany,
            this.createDatabase);

        this.router.put(
            "/companies/:company_id/database/:database_id",
            authenticator.authenticate,
            checkAdmin,
            checkInsideCompany,
            this.updateDatabase);

        this.router.delete(
            "/companies/:company_id/database/:database_id",
            authenticator.authenticate,
            checkAdmin,
            checkInsideCompany,
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
     * @api {get} api/companies/:company_id/databases/:database_id
     * Get a stated database.
     * @apiVersion 1.0.0
     * @apiName getOneDatabase
     * @apiGroup Database
     * @apiPermission ADMIN
     *
     * @apiDescription Use this API to get the data of an existing
     * database.
     *
     * @apiParam {string} company_id The ID of the Company.
     * @apiParam {string} database_id The ID of the database to return.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/databases/5230
     *
     * @apiSuccess {string} _id The ID of the database.
     * @apiSuccess {string} idOwner the _id of the owner of the database.
     * @apiSuccess {string} username The username of the used used for read
     * data from the database.
     * @apiSuccess {string} password The password of the used used for read
     * data from the database.
     * @apiSuccess {string} host The host of the database.
     * @apiSuccess {string} name The name of the database.
     * @apiSuccess {Number} port The port of the database.
     * @apiSuccess {Array<String>} collections The collections inside the
     * database
     * @apiSuccess {string} company The id of the company.
     *
     * @apiError CannotFindTheDatabase It was impossible to find the requested
     * database.
     * @apiError NoAccessRight Only authenticated admins can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *         code: "ESM-000",
     *         message:
     *            "Cannot find the required data from the database"
     *     }
     */

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
        database
            .getOne(request.params.database_id)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function () : void {
                result
                    .status(404)
                    .json({
                        code: "ESM-000",
                        message:
                            "Cannot find the required data from the database"
                    });
            });
    }

    /**
     * @api {get} api/companies/:company_id/databases
     * Return a list of all the Company's databases
     * @apiVersion 1.0.0
     * @apiName getAllDatabase
     * @apiGroup Database
     * @apiPermission MEMBER
     *
     * @apiDescription Use this request to get a list of the accessible
     * database of the stated Company
     *
     * @apiParam {string} company_id The ID of the Company.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/databases/5230
     *
     * @apiSuccess {Array<DatabaseDocument>} data The array of database 
     * documents
     *
     * @apiError CannotFindTheDatabase It was impossible to find the requested
     * database.
     * @apiError NoAccessRight Only authenticated members can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "code": "ESM-000",
     *       "error": "Cannot find the required data from the database"
     *     }
     */
    /**
     * @description Get all databases for the company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getAllDatabasesForCompany(request : express.Request,
                                      result : express.Response) : void {
        database
            .getAllForCompany(request.params.company_id)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function () : void {
                result
                    .status(404)
                    .json({
                        code: "ESM-000",
                        message:
                            "Cannot find the required data from the database"
                    });
            });
    }

    /**
     * @api {put} api/companies/:company_id/databases/:database_id
     * Update a stated database.
     * @apiVersion 1.0.0
     * @apiName updateDatabase
     * @apiGroup Database
     * @apiPermission ADMIN
     *
     * @apiDescription Use this request to update an existing database.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} database_id The ID of the database to update.
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
     * @apiSuccess {string} _id The ID of the database.
     * @apiSuccess {string} idOwner the _id of the owner of the database.
     * @apiSuccess {string} username The username of the used used for read
     * data from the database.
     * @apiSuccess {string} password The password of the used used for read
     * data from the database.
     * @apiSuccess {string} host The host of the database.
     * @apiSuccess {string} name The name of the database.
     * @apiSuccess {Number} port The port of the database.
     * @apiSuccess {Array<String>} collections The collections inside the
     * database
     * @apiSuccess {string} company The id of the company.
     *
     * @apiError CannotMdifyDatabase It was impossible to modift the
     * database.
     * @apiError NoAccessRight Only authenticated admins can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       code: "EDB-000",
     *       message: "Cannot modify the databases"
     *     }
     */

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
        database
            .update(request.params.database_id, request.body)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function () : void {
                result
                    .status(400)
                    .json({
                        code: "EDB-000",
                        message: "Cannot modify the databases"
                    });
            });
    }

    /**
     * @api {delete} api/companies/:company_id/databases/:database_id
     * Remove a stated database.
     * @apiVersion 1.0.0
     * @apiName removeDatabase
     * @apiGroup Database
     * @apiPermission ADMIN
     *
     * @apiDescription Use this request to remove an existing database.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} database_id The ID of the database to remove.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/databases/5230
     *
     * @apiSuccess {string} _id The ID of the database.
     * @apiSuccess {string} idOwner the _id of the owner of the database.
     * @apiSuccess {string} username The username of the used used for read
     * data from the database.
     * @apiSuccess {string} password The password of the used used for read
     * data from the database.
     * @apiSuccess {string} host The host of the database.
     * @apiSuccess {string} name The name of the database.
     * @apiSuccess {Number} port The port of the database.
     * @apiSuccess {Array<String>} collections The collections inside the 
     * database
     * @apiSuccess {string} company The id of the company.
     *
     * @apiError CannotremoveDatabase It was impossible to remove the required
     * database.
     * @apiError NoAccessRight Only authenticated admins can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       code: "EDB-001",
     *       message: "Cannot remove the database"
     *     }
     */
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
        database
            .remove(request.params.database_id)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function () : void {
                result
                    .status(400)
                    .json({
                        code: "EDB-001",
                        message: "Cannot remove the database"
                    });
            });
    }

    /**
     * @api {post} api/companies/:company_id/databases/
     * Create a new database.
     * @apiVersion 0.1.0
     * @apiName createDatabase
     * @apiGroup Database
     * @apiPermission ADMIN
     *
     * @apiDescription Use this request to create a new database.
     *
     * @apiParam {Number} company_id The ID of the Company.
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
     * @apiSuccess {string} _id The ID of the database.
     * @apiSuccess {string} idOwner the _id of the owner of the database.
     * @apiSuccess {string} username The username of the used used for read
     * data from the database.
     * @apiSuccess {string} password The password of the used used for read
     * data from the database.
     * @apiSuccess {string} host The host of the database.
     * @apiSuccess {string} name The name of the database.
     * @apiSuccess {Number} port The port of the database.
     * @apiSuccess {Array<String>} collections The collections inside the
     * database
     * @apiSuccess {string} company The id of the company.
     *
     * @apiError CannotCreateTheDatabase It was impossible to create the new
     * database.
     * @apiError NoAccessRight Only authenticated admins can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       code: "EDB-002",
     *       message: "Cannot create the database"
     *     }
     */

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
        database
            .create(request.body)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function () : void {
                result
                    .status(400)
                    .json({
                        code: "EDB-002",
                        message: "Cannot create the database"
                    });
            });
    }
}

export default DatabaseRouter;
