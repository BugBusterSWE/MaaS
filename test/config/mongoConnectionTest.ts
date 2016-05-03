/**
 * This is a test for the MongoConnection class. Here we test if the
 * getter methods work correctly.
 */

import {MongoConnection} from "../../src/config/mongoConnection.ts";
import * as Chai from "chai"; // You need assertions. Trust me.

describe("MongoConnectionTest", () => {

    let toTest : MongoConnection = new MongoConnection(
        "user",
        "password",
        "host",
        "name"
    );

    describe("#getUser", () => {
        it ("Should have 'user' username", () => {
            Chai.expect(toTest.getUser()).to.equal("user");
        });
    });

    describe("#getPassword", () => {
        it ("Should have 'password' password", () => {
            Chai.expect(toTest.getPassword()).to.equal("password");
        });
    });

    describe("#getHost", () => {
        it ("Should have 'host' host", () => {
            Chai.expect(toTest.getHost()).to.equal("host");
        });
    });

    describe("#getDatabaseName", () => {
        it ("Should have 'name' dataabse name", () => {
            Chai.expect(toTest.getDatabaseName()).to.equal("name");
        });
    });
});
