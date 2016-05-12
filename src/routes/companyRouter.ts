import CompanyModel from "../models/companyModel";
import CompanyDocument from "../models/companyDocument";
import * as express from "express";
import * as promise from "es6-promise";

/**
 * This class contains endpoint definition about companies.
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Davide Rigoni | Create class | 03/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 *
 */
export default class CompanyRouter {

    private router : express.Router = express.Router();
    private companyModel : CompanyModel = new CompanyModel();

    constructor() {
        this.router.get("/companies", this.getAllCompanies);
        this.router.get("/companies/:company_id", this.getOneCompany);
        this.router.post("/companies", this.createCompany);
        this.router.put("/companies/:company_id", this.updateCompany);
        this.router.delete("/companies/:company_id", this.remove);
    }

    public getRouter() : express.Router {
        return this.router;
    }

    private getOneCompany(request : express.Request, result : express.Result) {
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
                        message: "Cannot find the request company"
                    });
            })
    }

    private getAllCompanies(request : express.Request, result : express.Result) : void {
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

    private createCompany(request : express.Request, result : express.Result) : void {
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

    private updateCompany(request : express.Request, result : express.Result) : void {
        this.companyModel
            .update(request.params.company_id, request.body)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function (error : Object) {
                result
                    .status(406)
                    .json({
                        done: false,
                        message: "Cannot modify the data"
                    });
            })
    }

    private remove(request : express.Request, result : express.Result) : void {
        this.companyModel
            .remove(request.params)
            .then(function (data : Object) : void {
                result
                    .status(200)
                    .json(data);
            }, function (error : Object) {
                result
                // Todo set the status
                    .status(400)
                    .json({
                        done: false,
                        message: "Impossible to remove the Company"
                    });
            });
    }
}
