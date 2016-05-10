/**
 * This is a test class for MongooseConnection class.
 */

import MongooseConnection from "../../src/models/mongooseConnection";
import * as Chai from "chai";
import * as mongoose from "mongoose";
import MongoConnection from "../../src/config/mongoConnection";

describe("MongooseConnection", () => {

    let toTest : MongooseConnection = MongooseConnection.getInstance();

    describe("#SingletonTest", () => {
        it ("Should follow the Singleton pattern", () => {
            let anotherInstance : MongooseConnection = MongooseConnection.
                getInstance();
            Chai.assert(toTest == anotherInstance, "They are the same" +
                " instance!");
        });
    });

    describe("#Connection Opened", () => {
        it ("Should open a connection", () => {
            /* 1 is the "connected" state
             * see
             *  stackoverflow.com/questions/19599543/check-mongoose-connection-
             *  state-without-creating-new-connection
             */
            setTimeout(() => Chai.expect(toTest.getRawConnection().readyState).
            to.equal(1), 5000);

        });
    });

    describe("#Connection Closed", () => {
        it ("Should close a connection", () => {
            /* 0 is the "disconnected" state
             * see
             *  stackoverflow.com/questions/19599543/check-mongoose-connection-
             *  state-without-creating-new-connection
             */
            toTest.disconnect();
            setTimeout(() => Chai.expect(toTest.getRawConnection().readyState).
            to.equal(0), 5000);
        });
    });

    describe("#Singleton Violation", () => {
        it ("Should raise an error when two new are called", () => {
            let fn : Function = function() : void {
                let anotherConnection : MongooseConnection;
                anotherConnection = new MongooseConnection(
                    new MongoConnection("", "", "", 0, ""));
            }
            Chai.expect(fn).to.throw(Error);
        });
    });
});
