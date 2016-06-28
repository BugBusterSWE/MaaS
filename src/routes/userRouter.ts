import * as express from "express";
import * as crypto from "crypto";
import {user, UserDocument} from "../models/userModel";
import {authenticator} from "../lib/authenticationChecker";
import {
    checkInsideCompany,
    checkOwner,
    checkOwnerWithIDSkip,
    checkSuperAdmin
} from "../lib/standardMiddlewareChecks";
import {mailSender, MailOptions} from "../lib/mailSender";
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
     * @description Complete constructor. Here we initialize user's routes.
     */
    constructor() {
        this.router = express.Router();

        this.router.post("/login", UserRouter.login);

        this.router.get(
            "/companies/:company_id/users",
            authenticator.authenticate,
            checkInsideCompany,
            this.getAllUsersForCompany);

        this.router.get(
            "/companies/:company_id/users/:user_id",
            authenticator.authenticate,
            checkInsideCompany,
            this.getOneUser);

        this.router.post(
            "/companies/:company_id/users",
            //authenticator.authenticate,
            //checkOwner,
            //checkInsideCompany,
            this.createUser);

        /*
         *   By the checkOwnerWithIDSkip the users allowed to 
         *   modify the credentials are only the owner of the company
         *   and the owner of the profile
         */
        this.router.put(
            "/companies/:company_id/users/:user_id/credentials",
            authenticator.authenticate,
            checkOwnerWithIDSkip,
            checkInsideCompany,
            this.changeCredentials);

        this.router.put(
            "/companies/:company_id/users/:user_id",
            authenticator.authenticate,
            checkOwner,
            checkInsideCompany,
            this.updateUser);

        this.router.delete(
            "/companies/:company_id/users/:user_id",
            authenticator.authenticate,
            checkOwner,
            checkInsideCompany,
            this.removeUser);

        this.router.post(
            "/admin/superadmins",
            authenticator.authenticate,
            checkSuperAdmin,
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
     * @api {get} api/login
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
    private static login(request : express.Request,
                         response : express.Response) : void {
        authenticator.login(request, response);
    }

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
     * @api {put} api/admin/superadmins
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
        user
            .addSuperAdmin(request.body)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function () : void {
                response
                    .status(400)
                    .json({
                        code: "ECU-011",
                        message: "Error on creation of the new superadmin"
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
        user
            .setCredentials(request.body.username,
                request.body.password,
                request.body.newUsername,
                request.body.newPassword)
            .then((data : Object) => {
                response
                    .status(200)
                    .json(data);
            }, () => {
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
    /**
     * @api {get} api/companies/:company_id/users/:user_id get the user
     * specified from the id
     * @apiVersion 0.1.0
     * @apiName specificUser
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
    private getOneUser(request : express.Request,
                       response : express.Response) : void {
        user
            .getOne(request.params.user_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function () : void {
                response
                    .status(500)
                    .json({
                        code: "ESM-000",
                        message: "Cannot get the user specified"
                    });
            });
    }

    /**
     * @description Get all the users for a company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    /**
     * @api {get} api/companies/:company_id/users get the users for the
     * company
     * @apiVersion 0.1.0
     * @apiName usersOfACompany
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
    private getAllUsersForCompany(request : express.Request,
                                  response : express.Response) : void {
        let company_id : string = request.params.company_id;

        user
            .getAllForCompany(company_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function () : void {
                response
                    .status(500)
                    .json({
                        code: "ESM-000",
                        message: "Cannot get the user list for this company"
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
    private updateUser(request : express.Request,
                       response : express.Response) : void {
        user
            .update(request.params.user_id, request.body)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function () : void {
                response
                    .status(400)
                    .json({
                        code: "ECU-002",
                        message: "Cannot modify the user credentials"
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

    private removeUser(request : express.Request,
                       response : express.Response) : void {
        user
            .remove(request.params.user_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function () : void {
                response
                    .status(400)
                    .json({
                        code: "ECU-003",
                        message: "Cannot remove the user"
                    });
            });
    }

    /**
     * @description Create a new user for a specific company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
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

    private createUser(request : express.Request,
                       response : express.Response) : void {
        let userData : UserDocument = request.body;
        console.log(request);
        userData.company = request.params.company_id;
        userData.password = crypto.randomBytes(20).toString("base64");
        let mailOptions : MailOptions = {
            from: "service@maas.com",
            to: userData.email,
            subject: "Benvenuto in MaaS!",
            text: "Ciao! Benvenuto in MaaS! \n" +
            "Inizia ad usare oggi il nostro servizio!\n\n" +
            "Utilizza queste credenziali per accedere al tuo profilo \n\n" +
            "Email: " + userData.email + "\n" +
            "Password: " + userData.password,
            html: "",
        };

        mailSender(mailOptions, function (error : Object) : void {
            if (!error) {
                user
                    .create(userData)
                    .then(function (data : Object) : void {
                        response
                            .status(200)
                            .json(data);
                    }, function () : void {
                        response
                            .status(400)
                            .json({
                                code: "ECU-001",
                                message: "Cannot create the user."
                            });
                    });
            } else {
                response
                    .status(400)
                    .json({
                        code: "ECM-001",
                        message: "Error sending Email."
                    });
            }
        });

    }
}

export const userRouter : express.Router = new UserRouter().getRouter();
