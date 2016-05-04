/**
 * This is a test for the TEST configuration. Here we test if the
 * getter methods work correctly.
 */

import * as Chai from "chai";
import {TestConfiguration} from "../../src/config/testConfiguration";
import {MongoConnection} from "../../src/config/mongoConnection";

describe("TestConfigurationTest", () => {

    let toTest : TestConfiguration = new TestConfiguration(
        new MongoConnection(
            "user",
            "password",
            "host",
            "name"
        ), "serverSecret"
    );

    // This function starts a single test
    describe("#getEnvName", () => {
        it ("Should have the envName equals to 'test'", () => {
            Chai.expect(toTest.getEnvName()).to.equal("test");
        });
    });

    describe("#getMongoConnection", () => {
        it ("Should have the correct MongoConnection parameters", () => {
            let connection : MongoConnection = toTest.getMongoConnection();
            Chai.expect(connection.getUser()).to.equal("user");
            Chai.expect(connection.getPassword()).to.equal("password");
            Chai.expect(connection.getHost()).to.equal("host");
            Chai.expect(connection.getDatabaseName()).to.equal("name");
        });
    });

    describe("#getServerSecret", () => {
        it ("Should have the correct encryption string", () => {
            Chai.expect(toTest.getServerSecret()).to.equal("serverSectet");
        });
    });
});
