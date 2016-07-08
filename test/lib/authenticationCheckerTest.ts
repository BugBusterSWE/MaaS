import {AuthenticationChecker, authenticator}
from "../../src/lib/authenticationChecker"
import * as Chai from "chai"
import {readFileSync, writeFileSync} from "fs";

describe("AuthenticationCheckerTest", () => {

    let toTest : AuthenticationChecker;

    // Call one of the many function that are in the Mocha framework
    beforeEach(() => {
        toTest = new AuthenticationChecker();
    });



    describe("#Login", () => {
        it("Should login a user", () => {
            // Test
        });
    });

    describe("#Authenticate", () => {
        it("Should authenticate a user", () => {
            // Test    
        });
    });
});
