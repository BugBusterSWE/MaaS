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
 * | Davide Polonio | Create userTest | 09/06/2016 |
 *
 * @author Davide Polonio
 * @copyright MIT
 *
 */
describe("UserRouter", () => {

    let maasIstance : MaaS;

    before( function () : void {
        maasIstance = new MaaS(JSON.parse(readFileSync(
            "test/config/mongoTest.json",
            "utf-8"
        )));
        maasIstance.run();
    });

    describe("#correctLogin", () => {
        it("should login correctly", () => {

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
