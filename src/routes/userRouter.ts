import * as express from "express";
import LevelChecker from "../lib/levelChecker";
import {user} from "../models/userModel";
import {authenticator} from "../lib/authenticationChecker";
/**
 * This class contains endpoint definition about users.
 *
 * @history
 * | Author      | Action Performed         | Data |
 * | ---         | ---                      | ---  |
 * | Luca Bianco | Create class UserRouter  | 10/05/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 *
 */
class UserRouter {

    /**
     * @description Express router.
     */
    private router : express.Router;

    /**
     * @description Level checker
     * @type {LevelChecker}
     */
    private checkOwner : LevelChecker;

    /**
     * @description Level checker for SuperAdmin
     * @type {LevelChecker}
     */
    private checkSuperAdmin : LevelChecker;

    /**
     * @description Complete constructor. Here we initialize user's routes.
     */
    constructor() {

        this.router = express.Router();
        this.checkOwner = new LevelChecker(["OWNER", "SUPERADMIN"]);
        this.checkSuperAdmin = new LevelChecker(["SUPERADMIN"]);
        this.router.post("/login",
            this.login);

        this.router.post("/login", this.login);

        this.router.get(
            "/companies/:company_id/users",
            this.checkOwner.check,
            this.getAllUsersForCompany);

        this.router.get(
            "/companies/:company_id/users/:user_id/",
            this.getOneUser);

        this.router.post(
            "/companies/:company_id/users",
            this.checkOwner.check,
            this.createUser);

        this.router.put(
            "/companies/:company_id/users/:user_id/credentials",
            this.checkOwner.checkWithIDSkip,
            this.updateUser);

        this.router.delete(
            "/companies/:company_id/users/:user_id",
            this.checkOwner.checkWithIDSkip,
            this.removeUser);

        this.router.post(
            "/admin/superadmins",
            this.checkSuperAdmin.check,
            this.createSuperAdmin);
    }

    /**
     * @description Return the Express router.
     * @returns {express.Router} The Express router.
     */
    public getRouter() : express.Router {
        return this.router;
    }

    /**
     * @api {get} api/login
     * User login.
     * @apiVersion 0.1.0
     * @apiName login
     * @apiGroup User
     *
     * @apiDescription Use this request in order to login.
     *
     * @apiParam {string} username The new user's email address.
     * @apiParam {string} password The new user's password.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/5741/users/12054/credentials
     *
     * @apiSuccess {Number} id The User's ID.
     * @apiSuccess {jwt} token Access token.
     *
     * @apiError CannotFindTheUser It was impossible to find the user.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "done": false,
     *       "error": "Cannot find the user"
     *     }
     */

    /**
     * @description Perform the user's login.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private login(request : express.Request,
                  response : express.Response) : void {
        authenticator.login(request, response);
    }

    /**
     * @api {put} api/admin/superadmins
     * Add a new superadmin
     * @apiVersion 0.1.0
     * @apiName createSuperAdmin
     * @apiGroup Admin
     * @apiPermission SUPERADMIN
     *
     * @apiDescription Use this API o add a new SuperAdmin
     *
     * @apiParam {Number} company_id The Company's ID.
     * @apiParam {Number} user_id The user's ID.
     * @apiParam {Number} user_id The ID of the logged user.
     * @apiParam {string} username The new user's email address.
     * @apiParam {string} password The new user's password.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/admin/superadmin
     *
     *
     * @apiError CannotAddTheSuperAdmin It was impossible to add the new
     * SuperAdmin
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       "done": false,
     *       "error": "Cannot add the new Super Admin"
     *     }
     */

    /**
     * FIXME: documentation to review
     * @description Creates a new super admin
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private createSuperAdmin(request : express.Request,
                             response : express.Response) : void {
        user
            .addSuperAdmin(request.body)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                // Todo : set the status
                    .status(400)
                    .json({
                        done: false,
                        message: "Cannot create the user"
                    });
            });
    }

    /**
     * @api {put} api/companies/:company_id/users/:user_id/credentials
     * Update credentials of an user.
     * @apiVersion 0.1.0
     * @apiName changeCredentials
     * @apiGroup User
     * @apiPermission GUEST
     *
     * @apiDescription Use this request to update your access credentials.
     *
     * @apiParam {Number} company_id The Company's ID.
     * @apiParam {Number} user_id The user's ID.
     * @apiParam {Number} user_id The ID of the logged user.
     * @apiParam {string} username The new user's email address.
     * @apiParam {string} password The new user's password.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/5741/users/12054/credentials
     *
     * @apiSuccess {Number} id The User's ID.
     * @apiSuccess {string} username The user's new username.
     * @apiSuccess {string} password The user's new password.
     *
     * @apiError CannotModifyTheUser It was impossible to update the user's
     * data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "done": false,
     *       "error": "Cannot modify the credentials"
     *     }
     */

    /**
     * @description Method to modify the credentials of an user
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private changeCredentials(request : express.Request,
                              response : express.Response) : void {
        user
            .setCredentials(request.body.username,
                request.body.password,
                request.body.newUsername,
                request.body.newPassword)
            .then((data : Object) => {
                response
                    .status(200)
                    .json(data);
            }, (error : Object) => {
                response
                    .status(400)
                    .json({
                        done: false,
                        message: "Cannot modify the credentials"
                    });
            });
    }

    /**
     * @api {get} api/companies/:company_id/users/:user_id get the user
     * specified from the id
     * @apiVersion 0.1.0
     * @apiName getOneUser
     * @apiGroup User
     * @apiPermission MEMBER
     *
     * @apiDescription Use this request to get the list of users for a company
     *
     * @apiParam {String} company_id The Company's ID.
     * @apiParam {String} user_id It's the user ID
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/5741/users/aòlss
     *
     * @apiSuccess {Number} id The User's ID.
     * @apiSuccess {string} username The user's new username.
     * @apiSuccess {string} password The user's new password.
     *
     * @apiError ESM-000 Cannot get the user specified
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 500
     *     {
     *          code: "ESM-000",
     *          message: "Cannot get the user specified"
     *     }
     */

    /**
     * @description Get the user represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getOneUser(request : express.Request,
                       response : express.Response) : void {
        user
            .getOne(request.params.user_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Error) : void {
                response
                    .status(500)
                    .json({
                        code: "ESM-000",
                        message: "Cannot get the user specified"
                    });
            });
    }

    /**
     * @api {get} api/companies/:company_id/users get the users for the
     * company
     * @apiVersion 0.1.0
     * @apiName getAllUsersForCompany
     * @apiGroup User
     * @apiPermission MEMBER
     *
     *
     * @apiDescription Use this request to get the list of users for a company
     *
     * @apiParam {String} company_id The Company's ID.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/5741/users
     *
     * @apiSuccess {Number} id The User's ID.
     * @apiSuccess {string} username The user's new username.
     * @apiSuccess {string} password The user's new password.
     *
     * @apiError CannotModifyTheUser It was impossible to update the user's
     * data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 500
     *     {
     *          code: "ESM-000",
     *          message: "Cannot get the user list for this company"
     *     }
     */

    /**
     * FIXME: missing documentation
     * @description Get all the users for a company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getAllUsersForCompany(request : express.Request,
                                  response : express.Response) : void {
        let company_id : string = request.params.company_id;

        user
            .getAllForCompany(company_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                    .status(500)
                    .json({
                        code: "ESM-000",
                        message: "Cannot get the user list for this company"
                    });
            });
    }

    /**
     * @api {put} api/companies/:company_id/users/:user_id/credentials
     * Update credentials of an user.
     * @apiVersion 0.1.0
     * @apiName updateUser
     * @apiGroup User
     * @apiPermission GUEST
     *
     * @apiDescription Use this request to update your access credentials.
     *
     * @apiParam {Number} company_id The Company's ID.
     * @apiParam {Number} user_id The user's ID.
     * @apiParam {Number} user_id The ID of the logged user.
     * @apiParam {string} email The new user's email address.
     * @apiParam {string} password The new user's password.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/5741/users/12054/credentials
     *
     * @apiSuccess {Number} id The User's ID.
     * @apiSuccess {string} email The user's new email.
     * @apiSuccess {string} password The user's new password.
     *
     * @apiError CannotModifyTheUser It was impossible to update the user's
     * data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       code: "ECU-002",
     *       message: "Cannot modify the user credentials"
     *     }
     */

    /**
     * FIXME: missing documentation
     * @description Update the user represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private updateUser(request : express.Request,
                       response : express.Response) : void {
        user
            .update(request.params.user_id, request.body)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                    .status(400)
                    .json({
                        code: "ECU-002",
                        message: "Cannot modify the user credentials"
                    });
            });
    }

    /**
     * @api {delete} api/companies/:company_id/users/:user_id Remove an user.
     * @apiVersion 0.1.0
     * @apiName removeUser
     * @apiGroup User
     * @apiPermission OWNER
     *
     * @apiDescription Use this request to remove an user from a stated Company.
     *
     * @apiParam {Number} company_id The Company's ID.
     * @apiParam {Number} user_id The user's ID.
     * @apiParam {Number} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/5741/users/12054/
     *
     * @apiSuccess {Number} id The User's ID.
     *
     * @apiError NoAccessRight Only authenticated Owners can access the data.
     * @apiError CannotRemoveTheUser It was impossible to remove the user.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       "code": "ECU-003,
     *       "message": "Cannot remove the user"
     *     }
     */

    /**
     * FIXME: documentation to review
     * @description Remove the user represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private removeUser(request : express.Request,
                       response : express.Response) : void {
        user
            .remove(request.params.user_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                // Todo : set the status
                    .status(400)
                    .json({
                        code: "ECU-003",
                        message: "Cannot remove the user"
                    });
            });
    }

    /**
     * @api {post} api/companies/:company_id/users Create a new User
     * @apiVersion 0.1.0
     * @apiName createUser
     * @apiGroup User
     * @apiPermission OWNER
     *
     * @apiDescription Use this request to insert a new user in a stated
     * company.
     *
     * @apiParam {String} company_id The Company's ID.
     * @apiParam {String} user_id The ID of the logged user.
     * FIXME: params to review
     *
     * @apiExample Example usage:
     * curl  \
     *  -H "Accept: application/json" \
     *  -H "x-access-token: {authToken}" \
     *  -X POST \
     *  -d '{"email": "prova@try.it,  }' \
     *  http://maas.com/api/companies/5741/users
     *
     * @apiSuccess {Number}   id            The User's ID.
     *
     * @apiError NoAccessRight Only authenticated Owners can access the data.
     * @apiError CannotCreateTheUser It was impossible to create the user.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "code"  : "ECU-001",
     *       "error" : "Cannot create the user"
     *     }
     */

    /**
     * @description Create a new user for a specific company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private createUser(request : express.Request,
                       response : express.Response) : void {
        user
            .create(request.body)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                    .status(400)
                    .json({
                        code: "ECU-001",
                        message: "Cannot create the user."
                    });
            });
    }
}

export const userRouter : express.Router = new UserRouter().getRouter();
