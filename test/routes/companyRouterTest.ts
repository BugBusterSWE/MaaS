import {CompanyRouter} from "../../src/routes/companyRouter";
import * as express from "express";
import * as Chai from "chai";
import * as superAgent from "superagent";

/**
 * This is the test for CompanyRouter class
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Davide Rigoni | Create class | 03/05/2016 |
 *
 * @author Davide Rigoni
 * @copyright MIT
 *
 * Created by Davide Rigoni on 03/05/16.
 */
describe("CompanyRouterTest", () => {

    /* nothing to test for now
     let toTest : DatabaseRouter;
     let dummyExpress : express.Express = express();
     beforeEach(function () : void {
     toTest = new DatabaseRouter(dummyExpress);
     });
     describe("#nameOfWhatYouAreTesting", () => {
     it ("should <say what it should do>", () => {
     // Your code here
     });
     });
     */
    
    /*let toTest : CompanyRouter;
    let routerToTest : express.Router;
    
    before( function () : void {
        
        toTest = new CompanyRouter();
        routerToTest = toTest.getRouter();
    });
    
    describe("#createCompany", () => {
        it("should create a company", () => {
           
           // I don't know the JSON to send
           let companyToCreate : Object = {
               
               company: "CompanyTest",
               _id: "" // Need the user id of the owner
           }
            
           superAgent
           // But is this correct?
                .post("/api/admin/companies")
                .send(companyToCreate)
                .set("Content-Type', 'application/json")
                .end(function (err : Object, res : superAgent.Response) {
                    Chai.expect(err).to.not.undefined;
                });
        });
    });*/
});

