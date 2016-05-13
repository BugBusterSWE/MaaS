import CompanyModel from "../models/companyModel";
import CompanyDocument from "../models/companyModel";
import * as express from "express";
import * as promise from "es6-promise";
import LevelChecker from "../lib/levelChecker";

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
class CompanyRouter {

    /**
     * @description Express router.
     */
    private router : express.Router;

    /**
     * @description Company model.
     */
    private companyModel : CompanyModel;

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
     * Complete constructor. Here we initialize the company routes.
     */
    constructor() {

        // Init fields.
        this.router = express.Router();
        this.companyModel = new CompanyModel();
        this.checkAdmin = new LevelChecker(["ADMIN", "OWNER", "SUPERADMIN"]);
        this.checkOwner = new LevelChecker(["OWNER", "SUPERADMIN"]);
        this.checkSuperAdmin = new LevelChecker(["SUPERADMIN"]);

        // Set the endpoints.
        this.router.get(
            "/admin/companies",
            this.checkSuperAdmin.check,
            this.getAllCompanies);

        this.router.get(
            "/companies/:company_id",
            this.getOneCompany);

        this.router.post(
            "/companies",
            this.createCompany);

        this.router.put(
            "/companies/:company_id",
            this.checkAdmin.check,
            this.updateCompany);

        this.router.delete(
            "/companies/:company_id",
            this.checkOwner.check,
            this.remove);
    }

    /**
     * @description Return the Express router.
     * @returns {express.Router} The Express router.
     */
    public getRouter() : express.Router {
        return this.router;
    }

    /**
     * @description Get a specific Company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getOneCompany(request : express.Request,
                          result : express.Response) : void {
        this.companyModel
            .getOne(request.params.company_id)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                result
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot find the requested company"
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
    private getAllCompanies(request : express.Request,
                            result : express.Response) : void {
        this.companyModel
            .getAll()
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                // Todo: che status?
                result
                    .status(400)
                    .json({
                        done: false,
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
    private createCompany(request : express.Request,
                          result : express.Response) : void {
        this.companyModel
            .create(request.body)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                result
                // Not acceptable
                    .status(406)
                    .json({
                        done: false,
                        message: "Cannot save the company"
                    })
            });
    }

    /**
     * Update a steted Company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private updateCompany(request : express.Request,
                          result : express.Response) : void {
        this.companyModel
            .update(request.params.company_id, request.body)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                result
                    .status(406)
                    .json({
                        done: false,
                        message: "Cannot modify the data"
                    });
            })
    }

    /**
     * Remove a stated company.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private remove(request : express.Request,
                   result : express.Response) : void {
        this.companyModel
            .remove(request.params)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                result
                // Todo set the status
                    .status(400)
                    .json({
                        done: false,
                        message: "Can't remove the Company"
                    });
            });
    }
}

export default CompanyRouter;
