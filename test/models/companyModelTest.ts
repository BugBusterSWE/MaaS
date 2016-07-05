import {CompanyModel, company} from "../../src/models/companyModel";
import {CompanyDocument} from "../../src/models/companyModel";
import * as Chai from "chai";
import {readFileSync, writeFileSync} from "fs";

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

describe("CompanyModelTest", () => {

    let toTest : CompanyModel;
    let testJson : string;
    let configurationBackup : string;
    let testID : string = "<InserireID1>";
    let anotherTestID : string = "<InserireID2>";

    before( function () : void {

        toTest = company;

        testJson = JSON.parse(readFileSync(
            "test/config/mongoTest.json",
            "utf-8"
        ));

        configurationBackup = JSON.parse(readFileSync(
            "src/config/mongoParameters.json",
            "utf-8"
        ));

        writeFileSync(
            "src/config/mongoParameters.json",
            testJson,
            "utf-8"
        );
    });

    after( function () : void {

        // Restoring the old configuration
        writeFileSync(
            "src/config/mongoParameters.json",
            JSON.stringify(configurationBackup),
            "utf-8"
        );

    });

    describe("#Add", () => {
        it("Should create a company and the owner", () => {

         /*   toTest.create({
                "name" : "testingAdd",
                "owner" : "1234567890"
            }).then( function (data : Object) : void {
                 // Test if the data received are ok
            }); */
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
