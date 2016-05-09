import DSLChecker from "../../src/lib/dslChecker"
import * as mocha from "mocha"
import * as Chai from "chai"

describe("DSLCheckTest", () => {

    let toTest : DSLChecker;

    // Call one of the many function that are in the Mocha framework
    beforeEach(() => {
        toTest = new DSLChecker();
    });

    // This function starts a single test
    describe("#workWithCell", () => {
        it ("should return true", () => {
            Chai.expect(toTest.check({
                root: "1",
                "1": {
                    type: "cell",
                    pModel: {}
                }
            })).to.equal( true );
        });
    });
});