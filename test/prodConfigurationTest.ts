/**
 * This is a test for the PRODUCTION configuration. Here we test if the
 * getter methods work correctly.
 */

import * as Chai from "chai";
import {ProdConfiguration} from "../src/config/prodConfiguration";
import {MongoConnection} from "../src/config/mongoConnection";

describe("ProdConfigurationTest", () => {

    let toTest : ProdConfiguration = new ProdConfiguration(
        new MongoConnection(
            "user",
            "password",
            "host",
            "name"
        ), "serverSecret"
    );

    // This function starts a single test
    describe("#getEnvName", () => {
        it ("Should have the envName equals to 'production'", () => {
            Chai.expect(toTest.getEnvName()).to.equal("production");
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
