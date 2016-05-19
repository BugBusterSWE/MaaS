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
import UserRouter from "./userRouter";
import DatabaseRouter from "./databaseRouter";
import CompanyRouter from "./companyRouter";

let RouterFacade : express.Router = express.Router();

RouterFacade.use(new DSLRouter().getRouter());
RouterFacade.use(new UserRouter().getRouter());
RouterFacade.use(new DatabaseRouter().getRouter());
RouterFacade.use(new CompanyRouter().getRouter());




///////////////////////////////////////////////////////////////////////////////
import UserModel from "../models/userModel";
const user : UserModel = new UserModel();

RouterFacade.get("/setup", function(request, response) {
   user.addSuperAdmin({
       email: "bug@prova.it",
       password: "123456ciao"
   }).then(function(data) {
       response.json(data);
   })
});




///////////////////////////////////////////////////////////////////////////////




export default RouterFacade;
