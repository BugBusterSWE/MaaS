import * as Chai from "chai"
import * as mongoose from "mongoose"
import {DSLModel, dsl} from "../../src/models/dslModel"

describe("DSLModel", () => {

    let dslTest : DSLModel = dsl;

    /*beforeEach(() => {
       dsl = new DSLModel(); // Cannot overwrite `DSL` model once compiled
    }); */

    describe("#loadADSLOnDatabase", () => {
        it("should exec the callback", () => {
            let promise : Promise<Object> =
                dslTest.create({
                    permission: [{user: "bo", read: true, exec: true}],
                    content: "this is unsafe"
                });

            /* @todo
            promise.onFulfill((data : Object) => {
                console.log("Hello world!");

            }).onReject((error : Object) => {
                console.log("Errore");
            });*/
        });
    });
});
