import {company, CompanyDocument} from "../models/companyModel";
import * as express from "express";
import {user, UserDocument} from "../models/userModel";
import {authenticator} from "../lib/authenticationChecker";
import {
    checkSuperAdmin,
    checkInsideCompany,
    checkAdmin,
    checkOwner
} from "../lib/standardMiddlewareChecks";
import {mailSender, MailOptions} from "../lib/mailSender";
/**
 * This class contains endpoint definition about companies.
 *
 * @history
 * | Author         | Action Performed  | Data       |
 * | ---            | ---               | ---        |
 * | Davide Rigoni  | Create class      | 03/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 *
 */
export class CompanyRouter {

    /**
     * @description Express router.
     */
    private router : express.Router;

    /**
     * @description Complete constructor. Here we initialize the company routes.
     */
    constructor() {

        // Init fields.
        this.router = express.Router();

        // Set the endpoints.
        this.router.get(
            "/companies/:company_id",
            authenticator.authenticate,
            checkInsideCompany,
            this.getOneCompany);

        this.router.put(
            "/companies/:company_id",
            authenticator.authenticate,
            checkAdmin,
            checkInsideCompany,
            this.updateCompany);

        this.router.delete(
            "/companies/:company_id",
            authenticator.authenticate,
            checkOwner,
            checkInsideCompany,
            this.remove);

        this.router.get(
            "/admin/companies",
            authenticator.authenticate,
            checkSuperAdmin,
            this.getAllCompanies);

        this.router.post(
            "/companies",
            this.createCompany);

        this.router.post(
            "/companies/:company_id/users/:user_id/sendContent",
            authenticator.authenticate,
            checkInsideCompany,
            this.sendElementToMail);
    }

    /**
     * @description Return the Express router.
     * @returns {express.Router} The Express router.
     */
    public getRouter() : express.Router {
        return this.router;
    }

    /**
     * @api {get} api/companies/:company_id
     * Get the data of a stated Company.
     * @apiVersion 1.0.0
     * @apiName getOneCompany
     * @apiGroup Company
     * @apiPermission GUEST
     *
     * @apiDescription Use this request to get the data of a specific Company.
     *
     * @apiParam {String} company_id The ID of the Company.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540
     *
     * @apiSuccess {string} _id The _id of the company.
     * @apiSuccess {string} name The name of the company.
     * @apiSuccess {string} owner The id of the owner.
     *
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * Company.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "code": "ECM-000",
     *       "message": "Cannot get the company required"
     *     }
     */
    /**
     * @description <p> Get a specific Company specified by the id in the
     * request.params.company_id filed.</p>
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getOneCompany(request : express.Request,
                          result : express.Response) : void {
        company
            .getOne(request.params.company_id)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function () : void {
                result
                    .status(404)
                    .json({
                        code: "ECM-000",
                        message: "Cannot find the company required"
                    });
            })
    }

    /**
     * @api {get} api/admin/companies
     * Get the data of all the companies subscribed to MaaS.
     * @apiVersion 0.1.0
     * @apiName getAllCompanies
     * @apiGroup Company
     * @apiPermission SUPERADMIN
     *
     * @apiDescription Use this request to get the data of all the companies
     * subscribed to MaaS. They are stored in an array.
     *
     * @apiParam {Number} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/company_id
     *
     * @apiSuccess (200) {Array<CompanyDocument>} Gets an array of
     * CompanyDocument with all data of companies registered on MaaS.
     *
     * @apiError NoAccessRight Only authenticated Super Admins can access
     * the data.
     * @apiError CannotFindAnyCompany It was impossible to find any Company.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       "code": "ESM-000",
     *       "message": "Cannot get companies data"
     *     }
     */
    /**
     * @description Get all the companies subscribed to MaaS.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getAllCompanies(request : express.Request,
                            result : express.Response) : void {
        company
            .getAll()
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function () : void {
                result
                    .status(400)
                    .json({
                        code: "ESM-000",
                        message: "Cannot get companies data"
                    })
            });
    }

    /**
     * @api {post} api/companies
     * Creates a new Company.
     * @apiVersion 0.1.0
     * @apiName createCompany
     * @apiGroup Company
     *
     * @apiDescription Use this request to create a new Company.
     *
     * @apiParam {string} name The name of the Company.
     * @apiParam {string} email the email company owner.
     * @apiParam {string} password the password for the owner.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540
     *
     * @apiSuccess {CompanyDocument} company the company data
     * @apiSuccess {UserDocument} user the data of the owner of the company.
     *
     * @apiError CannotCreateTheCompany It was impossible to find the requested
     * Company.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "done": false,
     *       "error": "Cannot save the Company"
     *     }
     */
    /**
     * @description Create a new Company and its owner profile.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private createCompany(request : express.Request,
                          result : express.Response) : void {
        const userToSave : UserDocument = request.body.user;
        const companyToSave : CompanyDocument = request.body.company;

        let mailOptions : MailOptions = {
            from: "service@maas.com",
            to: userToSave.email,
            subject: "MaaS registration",
            text: "Hello and welcome in MaaS! \n" +
            "Thanks to begin to use our service with " +
            companyToSave.name + " \n" +
            "You can start using our service from now!\n\n" +
            "Best regards, \n" +
            "The MaaS team",
            html: "",
        };

        userToSave.level = "OWNER";
        user
            .create(userToSave)
            .then((userSaved : UserDocument) : void => {
                companyToSave.owner = userSaved._id;
                company
                    .create(companyToSave)
                    .then((companySaved : CompanyDocument) : void => {
                        user
                            .update(userSaved._id, {company: companySaved._id})
                            .then(() => {
                                mailSender(mailOptions,
                                    function (error : Object) : void {
                                        if (error) {
                                            result
                                                .status(400)
                                                .json({
                                                    code: "ECM-001",
                                                    message:
                                                        "Error sending Email."
                                                });
                                        }
                                        userSaved.company = companySaved._id;
                                        result.json(
                                            {
                                                user: userSaved,
                                                company: companySaved
                                            }
                                        );
                                    });
                            });
                    }, () : void => {
                        result
                            .status(400)
                            .json(
                                {
                                    code: "ECM-005",
                                    message: "Error creating new Company"
                                }
                            );
                    });
            }, () : void => {
                result
                    .status(400)
                    .json(
                        {
                            code: "ECU-001",
                            message: "Error creating new User"
                        }
                    );
            });
    }

    /**
     * @api {put} api/companies/:company_id
     * Update the data of a specific Company.
     * @apiVersion 0.1.0
     * @apiName updateCompany
     * @apiGroup Company
     * @apiPermission ADMIN
     *
     * @apiDescription Use this request to update the data of a specific
     * Company.
     *
     * @apiParam {string} company_id The ID of the Company.
     * @apiParam {string} name The new name of the Company.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540
     *
     * @apiSuccess {string} _id The _id of the company.
     * @apiSuccess {string} name The name of the company.
     * @apiSuccess {string} owner The id of the owner.
     *
     * @apiError CannotModifyTheCompany It was impossible to modify the required
     * Company.
     * @apiError NoAccessRight Only authenticated Admins can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 406
     *     {
     *       "code": "ECM-001",
     *       "message": "Cannot modify the company data"
     *     }
     */

    /**
     * @description <p> Updates the data related with an existing company
     * specified by the company_id in the request url</p>
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private updateCompany(request : express.Request,
                          result : express.Response) : void {
        company
            .update(request.params.company_id, request.body)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function () : void {
                result
                    .status(406)
                    .json({
                        code: "ECM-001",
                        message: "Cannot modify the company data"
                    });
            })
    }

    /**
     * @api {delete} api/companies/:company_id
     * Delete the data of a specific Company.
     * @apiVersion 0.1.0
     * @apiName removeCompany
     * @apiGroup Company
     * @apiPermission OWNER
     *
     * @apiDescription Use this request to remove a specific Company.
     *
     * @apiParam {string} company_id The ID of the Company.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540
     *
     * @apiError CannotRemoveTheCompany It was impossible to remove the required
     * Company.
     * @apiError CannotRemoveAllMembers It was impossible to remove all the
     * members of the company.
     * @apiError NoAccessRight Only authenticated Owners can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "code": "ECM-002",
     *       "message": "Cannot remove the Company"
     *     }
     */
    /**
     * @description <p> Deletes a company specified by company_id in
     * request.params.company_id field. </p>
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private remove(request : express.Request,
                   result : express.Response) : void {
        company
            .remove(request.params.company_id)
            .then(function (data : Object) : void {
                user
                    .removeAllMembersOfACompany(request.params.company_id)
                    .then(function (data : Object) : void {
                        result
                            .status(200)
                            .json(data);
                    }, function () : void {
                        result
                            .status(400)
                            .json({
                                code: "ECM-002",
                                message: "Can't remove all " +
                                "members of the Company"
                            });
                    });
            }, function () : void {
                result
                    .status(400)
                    .json({
                        code: "ECM-002",
                        message: "Can't remove the Company"
                    });
            });
    }

    /**
     * @api {post} api/companies/:company_id/users/:user_id/sendContent
     * Used to send an email the a content starting from a company
     * @apiVersion 0.1.0
     * @apiName sendContent
     * @apiGroup Company
     * @apiPermission GUEST
     *
     * @apiDescription Use this request to send data from a company
     *
     * @apiParam {string} company_id The _id of the Company.
     * @apiParam {string} user_id The _id of the user that sends the email.
     * @apiParam {string} email The email of the Receiver.
     * @apiParam {string} emailBody The string of the html to send via email.
     * @apiParam {string} title The subject of the mail.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540
     *
     * @apiError CannotFindCompany Can't get the company data
     * @apiError CannotFindUser Can't get the data of the sender of the email
     * @apiError NoAccessRight Only authenticated users of a company can access
     * the data.
     * @apiError ErrorSendingEmail Can't send the email 
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "code": "ECM-002",
     *       "message": "Cannot remove the Company"
     *     }
     */
    /**
     * @description <p> Send an element from company via email to a specified
     * address </p>
     * @param request
     * @param response
     */
    private sendElementToMail(request : express.Request,
                              response : express.Response) : void {
        const company_id : string = request.params.company_id;
        const user_id : string = request.params.user_id;

        const email : string = request.body.email;
        const emailBody : string = request.body.emailBody;
        const title : string = request.body.title;
        company
            .getOne(company_id)
            .then((companyData : CompanyDocument) => {
                user
                    .getOne(user_id)
                    .then((userData : UserDocument) => {
                        const emailOptions : MailOptions = {
                            from: userData.email,
                            to: email,
                            subject: title,
                            text: "",
                            html: "<h1>" + companyData.name +
                            " has sent these data to you from MaaS</h1>" +
                            emailBody,
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
                            .status(404)
                            .json({
                                code: "ESM-000",
                                message: "Cannot get the user specified"
                            });
                    })
            }, () => {
                response
                    .status(404)
                    .json({
                        code: "ECM-000",
                        message: "Cannot find the company required"
                    });
            })
    }
}

export default CompanyRouter;
