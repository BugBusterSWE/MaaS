import * as express from "express";

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

RouterFacade.get("/setup", function (request, response) {
    user.addSuperAdmin({
        email: "bug@prova.it",
        password: "123456ciao"
    }).then(function (data) {
        response.json(data);
    }, function (error) {
        response.json(error);
    });

    console.log("ENDED");
});


///////////////////////////////////////////////////////////////////////////////


export default RouterFacade;
