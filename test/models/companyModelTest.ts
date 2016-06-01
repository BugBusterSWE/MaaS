import {CompanyModel, company} from "../../src/models/companyModel";
import {CompanyDocument} from "../../src/models/companyModel";
import * as Chai from "chai";
import * as mongoose from "mongoose";

/**
 * CompanyModel implements the company business logic. It contains model and
 * scheme defined by MongooseJS.
 *
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Davide Rigoni | Create class | 06/05/2016 |
 *
 * @author Davide Rigoni
 * @copyright MIT
 *
 *
 */

describe("CompanyModel", () => {

    let toTest : CompanyModel = company;
    let testID : string = "<InserireID1>";
    let anotherTestID : string = "<InserireID2>";

    describe("#Add", () => {
        it("Should create a company and the owner", () => {
            // TODO
        });
    });

    describe("#Find", () => {
        it("Should find a company", () => {
            toTest.getOne(testID).then(
                function(doc : CompanyDocument) : void {
                    Chai.expect(doc["_id"]).to.equal(testID);
                });
        });

        it("Should find all companies", () => {
            toTest.getAll().then(
                function(docs : CompanyDocument[]) : void {
                    Chai.expect(docs[0]["_id"]).to.equal(testID);
                    Chai.expect(docs[1]["_id"]).to.equal(anotherTestID);
                })
        })
    });

    describe("#Update", () => {
        /*toTest.update(testID, new CompanyDocument("AnotherName",
         "<OwnerID>")).

            then(function );*/
    });

    describe("#Remove", () => {
        it("Should remove a company given its id", () => {
            let promise : Promise<Object> = toTest.remove(testID);
            promise.then(function(doc : CompanyDocument) : void {
                toTest.getOne(doc["_id"]).then(
                    function(doc2 : CompanyDocument) : void {
                        Chai.expect(doc2).null;
                    })
            });
        })
    });
});
