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
                // Get the id of the database to query
                let companyId = req.param[0];
                //Query the database
                //If something goes wrong, call next()
                next();
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
