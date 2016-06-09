import DSLRouter from "../../src/routes/dslRouter";
import * as express from "express";
import * as Chai from "chai";
import * as superAgent from "superagent";
import MaaS from "../../src/maas";
import MongoConnection from "../../src/config/mongoConnection";
import {readFileSync} from "fs";

interface ILogin {

    email : string;
    password : string;
    grant_type : string;
}

/**
 * This is the test for DatabaseRouter class
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Davide Polonio | Add some tests | 09/06/2016 |
 * | Emanuele Carraro | Create class DSLRouter | 10/05/2016 |
 *
 * @author Emanuele Carraro
 * @copyright MIT
 *
 */
describe("DSLRouter", () => {

    /* nothing to test for now
     let toTest : DSLRouter;
     let dummyExpress : express.Express = express();
     beforeEach(function () : void {
     toTest = new DSLRouter(dummyExpress);
     });
     describe("#nameOfWhatYouAreTesting", () => {
     it ("should <say what it should do>", () => {
     // Your code here
     });
     });
    */

    let toTest : DSLRouter;
    let routerToTest : express.Router;
    let maasIstance : MaaS;
    let companyId : string;

    before( function () : void {
        maasIstance = new MaaS(JSON.parse(readFileSync(
            "test/config/mongoTest.json",
            "utf-8"
        )));
        maasIstance.run();
        toTest = new DSLRouter();
        routerToTest = toTest.getRouter();
    });

    describe("#correctLogin", () => {
        it("should login correctly", () => {

            // I don't know the JSON to send
            let loginToDo : ILogin = {

                email: "bug@prova.it",
                password: "123456ciao",
                grant_type: "password"
            }

            superAgent
            // But is this correct?
                .post("/api/login")
                .send(loginToDo)
                .set("Content-Type", "application/json")
                .end(function (
                    err : Object,
                    res : superAgent.Response
                ) : Chai.Assertion {
                    return Chai.expect(err).to.not.undefined;
                });
        });
    });

    describe("#wrongLogin", () => {
        it("should not login at all", () => {

            let loginToDo : ILogin = {

                email: "something@wrong.com",
                password: "somethingElse",
                grant_type: "password"
            }

            superAgent
                .post("/api/login")
                .send(loginToDo)
                .set("Content-Type", "application/json")
                .end(function (
                    err : Object,
                    res : superAgent.Response
                ) : Chai.Assertion {
                    return Chai.expect(res).to.not.undefined;
                });
        });
    });
});
