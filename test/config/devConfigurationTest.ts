/**
 * This is a test for the DEVELOPMENT configuration. Here we test if the
 * getter methods work correctly.
 */

import * as Chai from "chai";
import DevConfiguration from "../../src/config/devConfiguration";
import MongoConnection from "../../src/config/mongoConnection";

describe("DevConfigurationTest", () => {

    let toTest : DevConfiguration = new DevConfiguration(
        new MongoConnection(
            "admin",
            "admin",
            "ds013250.mlab.com",
            13250,
            "mongocbtest"
        ), "serverSecret"
    );

    // This function starts a single test
    describe("#getEnvName", () => {
        it ("Should have the envName equals to 'development'", () => {
            Chai.expect(toTest.getEnvName()).to.equal("development");
        });
    });

    describe("#getMongoConnection", () => {
        it ("Should have the correct MongoConnection parameters", () => {
            let connection : MongoConnection = toTest.getMongoConnection();
            Chai.expect(connection.getUser()).to.equal("admin");
            Chai.expect(connection.getPassword()).to.equal("admin");
            Chai.expect(connection.getHost()).to.equal("ds013250.mlab.com");
            Chai.expect(connection.getDatabasePort()).to.equal(13250);
            Chai.expect(connection.getDatabaseName()).to.equal("mongocbtest");
        });
    });

    describe("#getServerSecret", () => {
        it ("Should have the correct encryption string", () => {
            Chai.expect(toTest.getServerSecret()).to.equal("serverSecret");
        });
    });
});
