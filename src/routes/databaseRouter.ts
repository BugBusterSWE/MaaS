import * as express from "express";
/* import authentication checker */

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

    public getRouter () : express.Router {

        return this.routerRef;
    }

    private createGetRouter () : void {

        this.routerRef.get("/api/companies/:company_id/databases",
            (req : express.Request,
             res : express.Response,
             next : express.NextFunction) => {

                let idUser : number = req.body[0];

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
                 */


                /* Get the id of the database to query
                 * This need noImplicitAny: false
                 */
                let companyId : number = req.param[0];

                // Query the database

                // If something goes wrong, call next()
                next(/*new Error("description")*/);
        });
    }

}
