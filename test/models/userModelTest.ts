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
    let testJson : Object;
    let configurationBackup : Object;
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

        toTest.create({
             "username" : "cyofanni",
             "password" : "boh"
        });

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
            toTest.login(
                "cyofanni@gmail.com", "boh"
            ).then( function (data : Object) : void {

                // Test if the data received are ok
            });
        });
    });

    describe("#Add", () => {
        it("Should create a new user", () => {
               toTest.create({
                "name" : "drigoni",
                "password" : "bah"
            }).then( function (data : Object) : void {

                // Test if the data received are ok
            });
        });
    });

    describe("#AddSuperAdmin", () => {
        it("Should create a new superadmin", () => {
               toTest.addSuperAdmin({
                "name" : "drigoni",
                "password" : "bah"
            }).then( function (data : Object) : void {

                // Test if the data received are ok
            });
        });
    });

    describe("#SetCredentials", () => {
        it("Should set credentials for a user with valid old credentials",
          () => {
              toTest.setCredentials(
                "drigoni",
                "bah",
                "drigoni_new",
                "bah_new"
            ).then( function (data : Object) : void {

                // Test if the data received are ok
            });
        });
    });

    describe("#GetElement", () => {
        it("Should get the element represented by the passed id", () => {
              toTest.getOne(
                 "drigoni"
              ).then( function (data : Object) : void {

                // Test if the data received are ok
            });
        });
    });

    describe("#GetAllElements", () => {
        it("Should get all the elements of a collection", () => {
              toTest.getAll(

            ).then( function (data : Object) : void {

                // Test if the data received are ok
            });
        });
    });

    describe("#CheckUserCompany", () => {
        it("Should check if the user id is inside the company companyID",
        () => {
               toTest.checkUserCompany(
                   "cyofanni",
                   "12345"
            ).then( function (data : Object) : void {

                // Test if the data received are ok
            });
        });
    });

    describe("#GetAllforCompany", () => {
        it("Should return all the users for a specific company", () => {
              toTest.getAllForCompany(
                   "12345"
            ).then( function (data : Object) : void {

                // Test if the data received are ok
            });
        });
    });

    describe("#GetAllforRole", () => {
        it("Should return all the users for a specific role", () => {
              // Test
        });
    });

});
