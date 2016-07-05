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
            "/admin/companies",
            authenticator.authenticate,
            checkSuperAdmin,
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
     * FIXME: documentation
     * @description Get a specific Company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    /**
     * @api {get} api/companies/:company_id
     * Get the data of a stated Company.
     * @apiVersion 0.1.0
     * @apiName getAllCompanies
     * @apiGroup Company
     * @apiPermission GUEST
     *
     * @apiDescription Use this request to get the data of a specific Company.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540
     *
     * @apiSuccess {string} name The name of the company.
     * @apiSuccess {string} owner The company owner's email address.
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
     * @description Get all the companies subscribed to MaaS.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
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
     * @apiSuccess {array} Please take note that the 'name' and 'owner'
     * fields are
     * stored in an array. Each element of this array represents a company
     * subscribed to MaaS.
     * @apiSuccess {string} name The name of the company.
     * @apiSuccess {string} owner The company owner's email address.
     *
     * @apiError NoAccessRight Only authenticated Super admins can access
     * the data.
     * @apiError CannotFindAnyCompany It was impossible to find any Company.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "code": "ESM-000",
     *       "message": "Cannot get companies data"
     *     }
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
     * @description Create a new Company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    /**
     * @api {post} api/companies
     * Create a new Company.
     * @apiVersion 0.1.0
     * @apiName updateCompany
     * @apiGroup Company
     *
     * @apiDescription Use this request to create a new Company.
     *
     * @apiParam {string} name The name of the Company.
     * @apiParam {string} owner The ID of the owner of the Company.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540
     *
     * @apiSuccess {Number} id The id of the Company.
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
    private createCompany(request : express.Request,
                          result : express.Response) : void {
        const userToSave : UserDocument = request.body.user;
        const companyToSave : CompanyDocument = request.body.company;

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
                                userSaved.company = companySaved._id;
                                result.json(
                                    {
                                        user: userSaved,
                                        company: companySaved
                                    }
                                );
                            })
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
     * FIXME: documentation
     * @description Update a stated Company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
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
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {string} name The name of the Company.
     * @apiParam {string} owner The ID of the owner of the Company.
     * @apiParam {Number} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540
     *
     * @apiSuccess {Number} id The id of the Company.
     * @apiSuccess {string} name The new name of the company.
     * @apiSuccess {string} owner The new company owner's email address.
     *
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * Company.
     * @apiError NoAccessRight Only authenticated Admins can access
     * the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "code": "ECM-001",
     *       "message": "Cannot modify the company data"
     *     }
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
     * FIXME: documentation
     * @description Remove a stated company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
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
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540
     *
     * @apiSuccess {Number} id The id of the removed Company.
     *
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * Company.
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
    private remove(request : express.Request,
                   result : express.Response) : void {
        company
            .remove(request.params)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
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
