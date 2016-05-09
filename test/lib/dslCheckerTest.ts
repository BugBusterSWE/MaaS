import DSLChecker from "../../src/lib/dslChecker"
import * as mocha from "mocha"
import * as Chai from "chai"

describe("DSLCheckTest", () => {

    let toTest : DSLChecker;

    // Call one of the many function that are in the Mocha framework
    beforeEach(() => {
        toTest = new DSLChecker();
    });

    /*
     Test to show if DSLChecker check correctly a DSLStruct with inside 
     only the root elements (Cell,Collection,Dashboard,Document)
     */
    describe("#workWithOnlyRoot", () => {
        it("Cell", () => {
            Chai.expect(toTest.check({
                root: "1",
                "1": {
                    type: "cell",
                    pModel: {}
                }
            })).to.equal(true);
        });

	it("Collection", () => {
	    Chai.expect(toTest.check({
	        root: "1",
		"1": {
		     type: "collection",
		     pModel: {
		       action: ["2"],
		       index: "3",
		       document: "4"		      	     
		    }
		},

		"2": {
		     type: "action",
		     pModel: {}
		},

		"3": {
		     type: "index",
		     pModel: {
		       column: ["5"]
		     }
		},

		"4": {
		     type: "document",
		     pModel: {
		       action: ["6"],
		       row: ["7"]
		     }
		},
		
		"5": {
		     type: "column",
		     pModel: {}
		},

		"6": {
		     type: "action",
		     pModel: {}
		},
		
		"7": {
		     type: "row",
		     pModel: {}
		}
	    })).to.equal(true);
	});
    });
});