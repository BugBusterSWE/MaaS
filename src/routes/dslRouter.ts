import * as express from "express";

/**
 * This class contains endpoint definition about companies.
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Emanuele Carraro | Create class DSLRouter | 10/05/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 *
 */

export default class DSLRouter {

    private routerRef : express.Router;

    constructor() {
        this.routerRef = express.Router();
        this.createGetRouter();
    }

    /**
     * @description Return the router
     *
     * @returns {express.Router}
     */
    public getRouter() : express.Router {
        return this.routerRef;
    }

    private createGetRouter () : void {

        this.routerRef.get("/api/companies/:company_id/DSLs",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {
                // GetDSL
                // To be implemented
            });

        this.routerRef.get("/api/companies/:company_id/DSLs/:dsl_id",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {
                // GetDSLbyId
                // To be implemented
            });

        this.routerRef.post("/api/companies/:company_id/DSLs",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {
                // Create(dsl)
                // To be implemented
            });

        this.routerRef.put("/api/companies/:company_id/DSLs/:dsl_id",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {
                // Create(dsl)
                // To be implemented
            });

        this.routerRef.delete("/api/companies/:company_id/DSLs/:dsl_id",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {
                // Delete()
                // To be implemented
            });

        this.routerRef.get("/api/companies/:company_id/" +
            "users/:user_id/dashboard",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {
                // GetDashboard(user)
                // To be implemented
            });

        this.routerRef.get("/api/companies/:company_id/DSLs/:dsl_id/execute",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {
                // ExecuteDSL(id)
                // To be implemented
            });
    }

}
