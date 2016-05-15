import * as Chai from "chai"
import * as mongoose from "mongoose"
import DSLModel from "../../src/models/dslModel"

describe("DSLModel", () => {
    let dsl : DSLModel;

    beforeEach(() => {
       dsl = new DSLModel();
    });

    describe("#loadADSLOnDatabase", () => {
        it("should exec the callback", () => {
            let promise : Promise<Object> =
                dsl.create({
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
