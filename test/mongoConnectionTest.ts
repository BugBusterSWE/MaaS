/**
 * This is a test for the MongoConnection class. Here we test if the
 * getter methods work correctly.
 */

import MongoConnection from "../src/config/mongoConnection";
import * as Chai from "chai"; // You need assertions. Trust me.

describe("MongoConnectionTest", () => {

    let toTest : MongoConnection = new MongoConnection(
        "admin",
        "admin",
        "ds013250.mlab.com",
        13250,
        "mongocbtest"
    );

    describe("#getUser", () => {
        it ("Should have 'admin' username", () => {
            Chai.expect(toTest.getUser()).to.equal("admin");
        });
    });

    describe("#getPassword", () => {
        it ("Should have 'admin' password", () => {
            Chai.expect(toTest.getPassword()).to.equal("admin");
        });
    });

    describe("#getHost", () => {
        it ("Should have 'ds013250.mlab.com' host", () => {
            Chai.expect(toTest.getHost()).to.equal("ds013250.mlab.com");
        });
    });

    describe("#getDatabasePort", () => {
        it ("Should have '13250' port", () => {
            Chai.expect(toTest.getDatabasePort()).to.equal(13250);
        });
    });

    describe("#getDatabaseName", () => {
        it ("Should have 'mongocbtest' database name", () => {
            Chai.expect(toTest.getDatabaseName()).to.equal("mongocbtest");
        });
    });
});
