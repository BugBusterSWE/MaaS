import {UserModel, user} from "../../src/models/userModel";
import {UserDocument} from "../../src/models/userModel";
import * as Chai from "chai";
import {readFileSync, writeFileSync} from "fs";

/**
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

describe("UserModelTest", () => {

    let toTest : UserModel;
    let testJson : string;
    let configurationBackup : string;
    let testID : string = "<InserireID1>";
    let anotherTestID : string = "<InserireID2>";

    before( function () : void {

        toTest = user;

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

    describe("#Login", () => {
        it("Should login a user", () => {
			// Test
        });
    });

    describe("#Add", () => {
        it("Should create a new user", () => {
               // Test
        });
    });

    describe("#AddSuperAdmin", () => {
        it("Should create a new superadmin", () => {
               // Test
        });
    });

    describe("#SetCredentials", () => {
        it("Should set credentials for a user with valid old credentials",
          () => {
              // Test
        });
    });

    describe("#GetElement", () => {
        it("Should get the element represented by the passed id", () => {
              // Test
        });
    });

    describe("#GetAllElements", () => {
        it("Should get all the elements of a collection", () => {
              // Test
        });
    });

    describe("#CheckUserCompany", () => {
        it("Should check if the user id is inside the company companyID",
        () => {
              // Test
        });
    });

    describe("#GetAllforCompany", () => {
        it("Should return all the users for a specific company", () => {
              // Test
        });
    });

    describe("#GetAllforRole", () => {
        it("Should return all the users for a specific role", () => {
              // Test
        });
    });

});
