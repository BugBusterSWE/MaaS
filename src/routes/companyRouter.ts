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
class CompanyRouter {

    /**
     * @description Ref for express router.
     */
    private routerRef : express.Router;

    /**
     * @description Public constructor. It need a express router ref.
     *
     * @param expressRef {express.Router}
     * Reference to the express application
     *
     * @return {CompanyRouter}
     */
    constructor() {
        this.routerRef = express.Router();
        this.createGetRouter();
    }

    /**
     * @description Create company router
     */
    private createGetRouter () : void {
        this.routerRef.get("/api/companies/:company_id",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {
                /*
                * Here I use authentication checker and I need to check
                * the user level.
                * 1 - Call authentication checker as class .authenticate
                *     authenticationChecker.authenticate() -> returns a boolean
                *
                *     If the boolean returned is `false` the user
                *     hasn't right permission and so I raise a error and
                *     I have to call next with the error.
                *
                * 2 - See 1 but with level checker. The minimum is MEMBER.
                *     If > MEMBER I query the database.
                *
                * // If something goes wrong, call next()
                * // next(/*new Error("description"));*/
                let model : CompanyModel = new CompanyModel();
                model.getCompany(req.company_id).then(
                    function (doc : CompanyDocument) : void {
                        if (doc != undefined) {
                            res.json({
                                "code" : 200,
                                "message" : "Success",
                                "data" : doc
                            });
                        } else {
                            res.json({
                                "code" : 404,
                                "message" : "Company not found. Please try" +
                                " with a different ID. If this error persist" +
                                " please contact the owner of your company"
                            });
                        }
                    }
                )
            });

        this.routerRef.put("/api/companies/:company_id",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {
                let model : CompanyModel = new CompanyModel();
                model.update(req.company_id,
                    new CompanyDocument(req.body.name, req.body.ownerId)).then(
                    function (doc : CompanyDocument) : void {
                        /* */
                    }
                )
            });

        this.routerRef.delete("/api/companies/:company_id",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {
                let model : CompanyModel = new CompanyModel();
                model.delete(req.company_id).then(
                    function (doc : CompanyDocument) : void {
                        /* */
                    }
                )
            });

        this.routerRef.put("/api/admin/companies",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {
                let model : CompanyModel = new CompanyModel();
                model.getCompanies().then(
                    function (docs : CompanyDocument) : void {
                        if (docs != undefined) {
                            res.json({
                                "code" : 200,
                                "message" : "Success",
                                "data" : docs
                            });
                        } else {
                            res.json({
                                "code" : 404,
                                "message" : "Company not found. Please try" +
                                " with a different ID. If this error persist" +
                                " please contact the owner of your company"
                            });
                        }
                    }
                )
            });
    }


    /**
     * @description Return the express.Router param
     *
     * @returns {express.Router}
     */
    public getRouter(): express.Router{
        return this.routerRef;
    }
}

export default CompanyRouter;
