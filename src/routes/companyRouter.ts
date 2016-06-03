import {company} from "../models/companyModel";
import * as express from "express";
import LevelChecker from "../lib/levelChecker";
import {user, UserDocument} from "../models/userModel";

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
     * @description Minimum level: ADMIN
     */
    private checkAdmin : LevelChecker;

    /**
     * @description Minimum level: OWNER
     */
    private checkOwner : LevelChecker;

    /**
     * @description Level checker for super admin level.
     */
    private checkSuperAdmin : LevelChecker;

    /**
     * @description Complete constructor. Here we initialize the company routes.
     */
    constructor() {

        // Init fields.
        this.router = express.Router();
        this.checkAdmin = new LevelChecker(["ADMIN", "OWNER", "SUPERADMIN"]);
        this.checkOwner = new LevelChecker(["OWNER", "SUPERADMIN"]);
        this.checkSuperAdmin = new LevelChecker(["SUPERADMIN"]);

        // Set the endpoints.
        this.router.get(
            "/companies/:company_id",
            this.getOneCompany);

        this.router.put(
            "/companies/:company_id",
            this.checkAdmin.check,
            this.updateCompany);

        this.router.delete(
            "/companies/:company_id",
            this.checkOwner.check,
            this.remove);

        this.router.get(
            "/admin/companies",
            this.checkSuperAdmin.check,
            this.getAllCompanies);

        this.router.post(
            "/admin/companies",
            // CHECK
            this.createCompany);
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
     * @api {get} /api/companies/:company_id
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
            }, function (error : Object) : void {
                result
                    .status(400)
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
     * @api {get} /api/admin/companies
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
            }, function (error : Object) : void {
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
     * @api {post} /api/companies
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
        userToSave.level = "OWNER";
        user
            .create(request.body.user)
            .then((userSaved : {_id : string}) : void => {
                const companyToSave : {owner : string} = request.body.company;
                companyToSave.owner = userSaved._id;

                company
                    .create(companyToSave)
                    .then((companySaved : Object) => { // Missing typedef
                        user
                            .update(userSaved._id, {company: companySaved})
                            .then(function (data : Object) : void {
                                result.json(
                                    {
                                        done: true,
                                        user: data,
                                        company: companySaved
                                    }
                                );
                            }, function (error : Object) : void {
                                result.json(
                                    {
                                        done : false,
                                        message : "there was an error"
                                    }
                                );
                            });
                    });
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
     * @api {put} /api/companies/:company_id
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
            }, function (error : Object) : void {
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
     * @api {delete} /api/companies/:company_id
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
            }, function (error : Object) : void {
                result
                    .status(400)
                    .json({
                        done: false,
                        message: "Can't remove the Company"
                    });
            });
    }
}

export default CompanyRouter;
