import {CompanyRouter} from "../../src/routes/companyRouter";
import * as express from "express";
import * as Chai from "chai";
import * as superAgent from "superagent";
import MaaS from "../../src/maas";
import MongoConnection from "../../src/config/mongoConnection";
import {readFileSync} from "fs";


interface ICompany {
    company : string,
    _id : string
}
/**
 * This is the test for CompanyRouter class
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Davide Polonio | Update class | 04/06/2016 |
 * | Davide Rigoni | Create class | 03/05/2016 |
 *
 * @author Davide Rigoni
 * @copyright MIT
 *
 * Created by Davide Rigoni on 03/05/16.
 */
describe("CompanyRouterTest", () => {

    let toTest : CompanyRouter;
    let routerToTest : express.Router;
    let maasIstance : MaaS;
    let companyId : string;

    before( function () : void {
        maasIstance = new MaaS(JSON.parse(readFileSync(
            "test/config/mongoTest.json",
            "utf-8"
        )));
        maasIstance.run();
        toTest = new CompanyRouter();
        routerToTest = toTest.getRouter();
    });

    after( function () : void {

        maasIstance.stop();
    });

    describe("#createCompany", () => {
        it("should create a company", () => {

            // I don't know the JSON to send
            let companyToCreate : ICompany = {

                company: "CompanyTest",
                _id: "" // Need the user id of the owner
            }

            superAgent
            // But is this correct?
                .post("/api/admin/companies")
                .send(companyToCreate)
                .set("Content-Type", "application/json")
                .end(function (
                    err : Object,
                    res : superAgent.Response
                ) : Chai.Assertion {
                    return Chai.expect(err).to.not.undefined;
                });
        });
    });

    describe("#retriveACompany", () => {
        it("should retrive the company previously added", () => {

            superAgent
                .get("/api/companies/" + companyId + "/")
                .set("Accept", "application/json")
                .end(function (
                    err : Object,
                    res : superAgent.Response
                ) : Chai.Assertion {
                    return Chai.expect(err).to.not.undefined;
                });
        });
    });

    describe("#updateACompany", () => {
        it("should successfully update a exsistent company", () => {

            // I don't know the JSON to send
            let companyToUpdate : ICompany = {

                company: "NewCompanyTest",
                _id: "" // Need the user id of the owner
            }

            superAgent
                .post("/api/companies/" + companyId + "/")
                .send(companyToUpdate)
                .set("Content-Type", "application/json")
                .end(function (
                    err : Object,
                    res : superAgent.Response
                ) : Chai.Assertion {
                    return Chai.expect(err).to.not.undefined;
                });
        });
    });

    describe("#deleteACompany", () => {
        it("should successfully delete a exsistent company", () => {

            superAgent
                .del("/api/companies/" + companyId + "/")
                .end(function (
                    err : Object,
                    res : superAgent.Response
                ) : Chai.Assertion {
                    return Chai.expect(err).to.not.undefined;
                });
        });
    });
});

