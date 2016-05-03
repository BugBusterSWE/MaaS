/**
 * This class contains API definitions for companies database connections
 * Created by Davide Polonio on 03/05/16.
 */

import * as express from "express";

class DatabaseRouter {

    public expressRef : express.Express;
    
    
    constructor(expressRef : express.Express) {

        this.expressRef = expressRef;
    }
}
// I have to export something here?