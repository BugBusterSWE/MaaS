import * as Chai from "chai"
import * as mongoose from "mongoose"
import * as model from "../../src/models/dslModel"

describe("DSLModel", () => {
    let dsl : model.DSLModel;

    beforeEach(() => {
       dsl = new model.DSLModel();
    });

    describe("#loadADSLOnDatabase", () => {
        it("should exec the callback", () => {
            let promise : mongoose.Promise<(data : Object) => void> =
                dsl.add<Object>({
                    permission: [{user: "bo", read: true, exec: true}],
                    content: "this is unsafe"
                });

            promise.onFulfill((data : Object) => {
                console.log("Hello world!");

            }).onReject((error : Object) => {
                console.log("Errore");
            });
        });
    });
});
