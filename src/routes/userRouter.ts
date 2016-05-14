import * as express from "express";
import UserModel from "../models/userModel";
import AuthenticationChecker from "../lib/authenticationChecker";
import LevelChecker from "../lib/levelChecker";

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
     *  * @description Express router.
     */
    private router : express.Router;

    /**
     * @description User's model.
     */
    private userModel : UserModel;

    /**
     * @description Authentication checker.
     */
    private authCheck : AuthenticationChecker;

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
        this.userModel = new UserModel();
        this.authCheck = new AuthenticationChecker();
        this.checkOwner = new LevelChecker(["OWNER", "SUPERADMIN"]);
        this.checkSuperAdmin = new LevelChecker(["SUPERADMIN"]);

        this.router.get(
            "/companies/:company_id/users",
            this.checkOwner.check,
            this.getAllUsers);

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
     * @description Perform the user's login.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    /**
     * @api {get} /api/login
     * USer login.
     * @apiVersion 0.1.0
     * @apiName updateUser
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
    private login(request : express.Request,
                  response : express.Response) : void {
        this.authCheck
            .login(request, response);
        /*.then(function (data : Object) : void {
         response
         .status(200)
         .json(data);
         }, function (error : Error) : void {
         response
         .status(404)
         .json({
         done: false,
         message: "Cannot login"
         });
         });*/
    }

    // TODO: is this right?
    /**
     * @description Creates a new super admin
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    /**
     * @api {put} /api/admin/superadmins
     * Add a new superadmin
     * @apiVersion 0.1.0
     * @apiName addSuperAdmin
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
    private createSuperAdmin(request : express.Request,
    response : express.Response) : void {
        this.userModel
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
     * @description Method to modify the credentials of an user
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    /**
     * @api {put} /api/companies/:company_id/users/:user_id/credentials
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
    private changeCredentials(request : express.Request,
                              response : express.Response) : void {
        this.userModel
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
        this.userModel
            .getOne(request.params.user_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Error) : void {
                response
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot find the requested user"
                    });
            });
    }

    /**
     * @description Get all the users.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getAllUsers(request : express.Request,
                        response : express.Response) : void {
        this.userModel
            .getAll()
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot find the user"
                    });
            });
    }

    /**
     * @description Update the user represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    /**
     * @api {put} /api/companies/:company_id/users/:user_id/credentials
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
     *       "error": "Cannot modify the user"
     *     }
     */
    private updateUser(request : express.Request,
                       response : express.Response) : void {
        this.userModel
            .update(request.params.user_id, request.body)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                // Todo : set the status
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot modify the user"
                    });
            });
    }

    /**
     * @description Remove the user represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    /**
     * @api {delete} /api/companies/:company_id/users/:user_id Remove an user.
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
     *     HTTP/1.1 404
     *     {
     *       "done": false,
     *       "error": "Cannot remove the user"
     *     }
     */

    private removeUser(request : express.Request,
                       response : express.Response) : void {
        this.userModel
            .remove(request.params.user_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                // Todo : set the status
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot remove the user"
                    });
            });
    }

    /**
     * @description Create a new user.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    /**
     * @api {post} /api/companies/:company_id/users Read data of an User
     * @apiVersion 0.1.0
     * @apiName createUser
     * @apiGroup User
     * @apiPermission OWNER
     *
     * @apiDescription Use this request to insert a new user in a stated
     * company.
     *
     * @apiParam {Number} company_id The Company's ID.
     * @apiParam {Number} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/5741/users
     *
     * @apiSuccess {Number}   id            The User's ID.
     *
     * @apiError NoAccessRight Only authenticated Owners can access the data.
     * @apiError CannotCreateTheUser It was impossible to create the user.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "done": false,
     *       "error": "Cannot create the user"
     *     }
     */

    private createUser(request : express.Request,
                       response : express.Response) : void {
        this.userModel
            .create(request.body)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                // Todo : set the status
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot create the user"
                    });
            });
    }
}

export default UserRouter;
