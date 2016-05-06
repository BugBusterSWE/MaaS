import * as express from "express";

/**
 * This class contains API definitions for companies database connections.
 *  
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  | 
 * | Davide Polonio | Create class | 03/05/2016 |
 *
 * @author Davide Polonio
 * @copyright MIT
 *
 *
 * @todo Missing reference to the DatabaseModel object
 * 
 */
class DatabaseRouter {

    /**
     * @description Personal router for the class. The class load request here.
     */
    private routerRef : express.Router;

    /**
     * @description Public constructor.
     * 
     * @return {DatabaseRouter}
     */
    constructor() {

        this.routerRef = express.Router();

        this.createGetRouter();
    }

    private createGetRouter () : void {

        this.routerRef.get("/api/companies/:company_id/databases",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {

                /* Get the id of the database to query
                 * This need noImplicitAny: false
                 */
                let companyId : number = req.param[0];

                //Query the database

                //If something goes wrong, call next()
                next();
        });
    }

    public getRouter () : express.Router {

        return this.routerRef;
    }

}
