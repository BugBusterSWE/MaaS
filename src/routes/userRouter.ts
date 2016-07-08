import * as express from "express";
import * as crypto from "crypto";
import * as cryptoFE from "crypto-js";
import {user, UserDocument} from "../models/userModel";
import {authenticator} from "../lib/authenticationChecker";
import {
    checkInsideCompany,
    checkOwner,
    checkOwnerWithIDSkip,
    checkSuperAdmin,
    checOwnerOrMe
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
            authenticator.authenticate,
            checkOwner,
            checkInsideCompany,
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
            "/admin/users/:user_id/credentials",
            authenticator.authenticate,
            checkSuperAdmin,
            this.changeCredentials);

        this.router.put(
            "/companies/:company_id/users/:user_id",
            authenticator.authenticate,
            checOwnerOrMe,
            checkInsideCompany,
            this.updateUser);

        this.router.delete(
            "/companies/:company_id/users/:user_id",
            authenticator.authenticate,
            checOwnerOrMe,
            checkInsideCompany,
            this.removeUser);

        this.router.post(
            "/admin/superadmins",
            authenticator.authenticate,
            checkSuperAdmin,
            this.createSuperAdmin);

        this.router.get(
            "/admin/superadmins",
            authenticator.authenticate,
            checkSuperAdmin,
            this.getAllSuperAdmins);

        this.router.post(
            "/passwordRecovery",
            this.passwordRecovery);
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
     * @apiParam {string} email The new user's email address.
     * @apiParam {string} password The new user's password.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/5741/users/12054/credentials
     *
     * @apiSuccess {string} user_id The User's _id.
     * @apiSuccess {string} token Access token.
     * @apiSuccess {string} email The user's email.
     * @apiSuccess {string} level The user's level.
     * @apiSuccess {string} company The _id of the company of the user.
     * 
     * @apiError CannotFindTheUser It was impossible to find the user.
     * @apiError DatabaseError It was impossible to reach the database.
     * @apiError InvalidPassword The password was wrong.
     * 
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       code: "ESM-000",
     *       message: "Database error"
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
    private static login(request : express.Request,
                  response : express.Response) : void {
        authenticator.login(request, response);
    }

    /**
     * @api {post} api/admin/superadmins
     * Add a new superadmin
     * @apiVersion 1.0.0
     * @apiName createSuperAdmin
     * @apiGroup Admin
     * @apiPermission SUPERADMIN
     *
     * @apiDescription Use this API o add a new SuperAdmin
     *
     * @apiParam {string} email The new user's email address.
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
     *       code: "ECU-011",
     *       message: "Error on creation of the new superadmin"
     *     }
     */

    /**
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
     * @api {put} api/companies/:company_id/users/:user_id/credentials
     * Update credentials of an user.
     * @apiVersion 0.1.0
     * @apiName changeCredentials
     * @apiGroup User
     * @apiPermission GUEST
     *
     * @apiDescription Use this request to update your access credentials.
     *
     * @apiParam {string} company_id The Company's ID.
     * @apiParam {string} user_id The user's ID.
     * @apiParam {string} username The old user's email address.
     * @apiParam {string} password The old user's password.
     * @apiParam {string} newUsername The new username for the user.
     * @apiParam {string} newPassword The new password for the user.
     * 
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/5741/users/12054/credentials
     *
     * @apiSuccess {string} _id The User's _id.
     * @apiSuccess {string} username The user's new username.
     * @apiSuccess {string} password The user's new password.
     *
     * @apiError CannotModifyTheUser It was impossible to update the user's
     * data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       code: "ECU-002",
     *       message: "Cannot modify the credentials"
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
            }, () => {
                response
                    .status(400)
                    .json({
                        code: "ECU-002",
                        message: "Cannot modify the user credentials"
                    });
            });
    }

    /**
     * @api {get} api/companies/:company_id/users/:user_id 
     * Get the user specified by the user_id
     * @apiVersion 1.0.0
     * @apiName getOneUser
     * @apiGroup User
     * @apiPermission MEMBER
     *
     * @apiDescription Use this request to get a specific user data.
     *
     * @apiParam {String} company_id The Company's ID.
     * @apiParam {String} user_id It's the user ID
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/5741/users/aòlss
     *
     * @apiSuccess {string} _id The User's _id.
     * @apiSuccess {string} company The _id of the company of the user.
     * @apiSuccess {string} username The user's new username.
     * @apiSuccess {string} password The user's new password.
     *
     * @apiError CannotGetTheUser Cannot get the user specified
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
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
            }, function () : void {
                response
                    .status(404)
                    .json({
                        code: "ESM-000",
                        message: "Cannot get the user specified"
                    });
            });
    }


    /**
     * @api {get} api/companies/:company_id/users get the users for the
     * company
     * @apiVersion 1.0.0
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
     * @apiSuccess {Array} users The array of user data.
     *
     * @apiError CannotGetUsers It was impossible to get the user list for this
     * company.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *          code: "ESM-000",
     *          message: "Cannot get the user list for this company"
     *     }
     */

    /**
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
            }, function () : void {
                response
                    .status(404)
                    .json({
                        code: "ESM-000",
                        message: "Cannot get the user list for this company"
                    });
            });
    }



    /**
     * @api {get} api/admin/superadmins
     * @apiVersion 0.1.0
     * @apiName getSuperadmins
     * @apiGroup User
     * @apiPermission SUPERADMIN
     *
     *
     * @apiDescription Use this request to get the list of Super Admin
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/admin/superadmins
     *
     * @apiSuccess {Number} id The User's ID.
     * @apiSuccess {string} username The user's new username.
     * @apiSuccess {string} password The user's new password.
     *
     * @apiError CannotGetUsers It was impossible to get the user list.
     * @apiError NoAccessRight Only authenticated superadmins can get the 
     * list.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *          code: "ESM-000",
     *          message: "Cannot get the user list for SUPERADMIN"
     *     }
     */
    /**
     * @description Get all the Super Admins.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getAllSuperAdmins(request : express.Request,
                              response : express.Response) : void {

        let role : string = "SUPERADMIN";

        user
            .getAllForRole(role)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function () : void {
                response
                    .status(404)
                    .json({
                        code: "ECU-011",
                        message: "Cannot get the user list for SUPERADMIN"
                    });
            });
    }


    /**
     * @api {put} api/companies/:company_id/users/:user_id
     * Update the user profile
     * @apiVersion 1.0.0
     * @apiName updateUser
     * @apiGroup User
     * @apiPermission GUEST
     *
     * @apiDescription Use this request to update your access credentials.
     *
     * @apiParam {string} company_id The Company's ID.
     * @apiParam {string} user_id The user's ID.
     * @apiParam {string} level The level of the user.
     * @apiParam {string} email The new user's email address.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/5741/users/12054/credentials
     *
     * @apiSuccess {string} _id The User's _id.
     * @apiSuccess {string} level The new user level
     * @apiSuccess {string} email The user's new email.
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
     * @api {delete} api/companies/:company_id/users/:user_id 
     * Remove an user.
     * @apiVersion 1.0.0
     * @apiName removeUser
     * @apiGroup User
     * @apiPermission OWNER
     *
     * @apiDescription Use this request to remove an user from a stated Company.
     *
     * @apiParam {string} company_id The Company's _id.
     * @apiParam {string} user_id The user's _id.
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
     * @api {post} api/companies/:company_id/users Create a new User
     * @apiVersion 1.0.0
     * @apiName createUser
     * @apiGroup User
     * @apiPermission OWNER
     *
     * @apiDescription Use this request to insert a new user in a stated
     * company.
     *
     * @apiParam {String} company_id The Company's ID.
     * @apiParam {String} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl  \
     *  -H "Accept: application/json" \
     *  -H "x-access-token: {authToken}" \
     *  -X POST \
     *  -d '{"email": "prova@try.it,  }' \
     *  http://maas.com/api/companies/5741/users
     *
     * @apiSuccess {string} _id The User's _id.
     * @apiSuccess {string} email the email address of the user.
     * @apiSuccess {string} level the level of the user.
     * 
     * @apiError NoAccessRight Only authenticated Owners can access the data.
     * @apiError CannotCreateTheUser It was impossible to create the user.
     * @apiError ErrorSendingEmail Can't send the email
     * 
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
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
        let userData : UserDocument = request.body;
        userData.company = request.params.company_id;
        let initial_pass : string = crypto.randomBytes(20).toString("base64");
        let mailOptions : MailOptions = {
            from: "service@maas.com",
            to: userData.email,
            subject: "MaaS registration",
            text: "Hello and welcome in MaaS! \n" +
            "You can start using our service from now!\n\n" +
            "Below you can find your credentials: \n\n" +
            "Email: " + userData.email + "\n" +
            "Password: " + initial_pass + "\n\n" +
            "Best regards, \n" +
            "The MaaS team",
            html: "",
        };

        let encript1 : string = cryptoFE.SHA256(
            initial_pass, "BugBusterSwe").toString();
        let encryptedPassword : string = cryptoFE.SHA256(
            encript1, "MaaS").toString();

        userData.password = encryptedPassword;

        mailSender(mailOptions, function (error : Object) : void {
            if (!error) {
                user
                    .create(userData)
                    .then(function (data : UserDocument) : void {
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

    /**
     * @api {post} api/passwordRecovery Generates a new password for the user.
     * @apiVersion 1.0.0
     * @apiName passwordRecovery
     * @apiGroup User
     *
     * @apiDescription Use this API to generate a new password for the user 
     * and send it to the user's email address
     *
     * @apiParam {String} email The email of the user
     *
     *
     * @apiSuccess {string} message The success message
     *
     * @apiError NoAccessRight Only authenticated Owners can access the data.
     * @apiError CannotDoPasswordRecovery It was impossible to do the password
     * recovery.
     * @apiError ErrorSendingEmail Can't send the email
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       "code"  : "EPW-002",
     *       "message" : "Impossible to do the password recovery process"
     *     }
     */
    /**
     * @description method to send the email with a new password for the user
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private passwordRecovery(request : express.Request,
                             response : express.Response) : void {

        const email : string = request.body.email;

        user
            .passwordRecovery(email)
            .then((newPassword : string) => {
                const emailOptions : MailOptions = {
                    from: "serivce@maas.com",
                    to: email,
                    subject: "Password Recovery Service",
                    text: "Hi, we recovered your password. \n \n" +
                    "These are your new credentials: \n" +
                    "Email: " + email + " \n" +
                    "Password: " + newPassword,
                    html: "",
                };
                mailSender(emailOptions,
                    function (error : Object) : void {
                        if (error) {
                            response
                                .status(400)
                                .json({
                                    code: "ECM-001",
                                    message: "Error sending Email."
                                });
                        } else {
                            response
                                .status(200)
                                .json({
                                    message: "Email sent"
                                });
                        }
                    });
            }, () => {
                response
                    .status(400)
                    .json({
                        code : "EPW-002",
                        message : "Impossible to do the password " +
                        "recovery process"
                    })
            })
    }
}

export const userRouter : express.Router = new UserRouter().getRouter();
