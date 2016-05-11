import CompanyModel from "../../src/models/companyModel";
import CompanyDocument from "../../src/models/companyDocument";
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
    let toTest : CompanyModel = new CompanyModel();
    let testID : string = "<InserireID1>";
    let anotherTestID : string = "<InserireID2>";

    describe("#Add", () => {
        it("Should create a company and the owner", () => {
            // TODO
        });
    });

    describe("#Find", () => {
        it("Should find a company", () => {
            toTest.getCompanyById(testID).then(
                function(doc : CompanyDocument) : void {
                    Chai.expect(doc._id).to.equal(testID);
                });
        });

        it("Should find all companies", () => {
            toTest.getCompanies().then(
                function(docs : CompanyDocument[]) : void {
                    Chai.expect(docs[0]._id).to.equal(testID);
                    Chai.expect(docs[1]._id).to.equal(anotherTestID);
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
            let promise : mongoose.Promise = toTest.delete(testID);
            promise.then(function(doc : CompanyDocument) : void {
                toTest.getCompanyById(doc._id).then(
                    function(doc2 : CompanyDocument) : void {
                        Chai.expect(doc2).null;
                    })
            });
        })
    });
});
