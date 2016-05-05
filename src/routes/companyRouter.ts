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
     * @description Ref for express.
     */
    private expressRef : express.Express;

    /**
     * @description Public constructor. It need a express ref.
     *
     * @param expressRef {express.Express}
     * Reference to the express application
     *
     * @return {CompanyRouter}
     */
    constructor(expressRef : express.Express) {

        this.expressRef = expressRef;
    }

    /**
     * @todo implement function
     */
    public request( req : express.Request, res : express.Response, next : express.NextFunction )  : Promise<any> {

        // Work in progress
    }
}
