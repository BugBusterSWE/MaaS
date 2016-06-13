import * as express from "express";
import * as crypto from "crypto-js";

/**
 * Here we export all route files. You need only to import this file.
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Matteo Di Pirro | Create module     | 06/05/2016     |
 *
 * @author Matteo Di Pirro
 * @license MIT
 */

// Import the routes
import DSLRouter from "./dslRouter";
import {userRouter} from "./userRouter";
import DatabaseRouter from "./databaseRouter";
import CompanyRouter from "./companyRouter";

let RouterFacade : express.Router = express.Router();

RouterFacade.use(new DSLRouter().getRouter());
RouterFacade.use(userRouter);
RouterFacade.use(new DatabaseRouter().getRouter());
RouterFacade.use(new CompanyRouter().getRouter());


///////////////////////////////////////////////////////////////////////////////
import {user} from "../models/userModel";

RouterFacade.get("/setup", function (request : express.Request,
                                    response : express.Response) : void {
    let encript1 : string = crypto.SHA256(
        "123456ciao", "BugBusterSwe").toString();
    let encryptedPassword : string = crypto.SHA256(
        encript1, "MaaS").toString();
    user.addSuperAdmin({
        email: "bug@prova.it",
        password: encryptedPassword
    }).then(function (data : Object) : void {
        response.json(data);
    }, function (error : Object) : void {
        response.json(error);
    });
});


///////////////////////////////////////////////////////////////////////////////


export default RouterFacade;
