import * as express from "express";
import * as promise from "promise";

/**
 * This class contains API definitions for companies database connections.
 *  
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  | 
 * | Davide Polonio | Create class | 03/05/2016 |
 *
 * @author Davide Polonio
 * @license MIT
 * 
 */
class DatabaseRouter {

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
     * @return {DatabaseRouter}
     */
    constructor(expressRef : express.Express) {

        this.expressRef = expressRef;
    }
    
    
    public request( req : express.Request, res : express.Response, next : express.NextFunction )  : Promise<any> {        
        
        return req.params;
    }
}
