/**
 * This is a test for the ChooseConfiguration class.
 */

import ChooseConfiguration from "../../src/config/index";
import * as Chai from "chai"; // You need assertions. Trust me.
import {readFileSync} from "fs";
import MongoConnection from "../../src/config/mongoConnection";

describe("IndexTest", () => {

    describe("#developmentConfig", () => {
        it ("Should have 'development' configuration", () => {
            process.env.NODE_ENV = "development";
            Chai.expect(ChooseConfiguration.getConfig().getEnvName()).to.
            equal("development");
        });
    });

    describe("#productionConfig", () => {
        it ("Should have 'production' configuration", () => {
            process.env.NODE_ENV = "production";
            Chai.expect(ChooseConfiguration.getConfig().getEnvName()).to.
            equal("production");
        });
    });

    describe("#testConfig", () => {
        it ("Should have 'test' configuration", () => {
            process.env.NODE_ENV = "test";
            Chai.expect(ChooseConfiguration.getConfig().getEnvName()).to.
            equal("test");
        });
    });

    describe("#defaultConfig", () => {
        it ("Should have 'default' configuration", () => {
            process.env.NODE_ENV = "default";
            Chai.expect(ChooseConfiguration.getConfig().getEnvName()).to.
            equal("production");
        });
    });

    describe("#correctParameters", () => {
        it ("Should read the right parameters", () => {
            let params : MongoConnection = JSON.parse(readFileSync(
                "src/config/mongoParameters.json",
                "utf-8"
            ));
            let connection : MongoConnection = ChooseConfiguration.getConfig().
                getMongoConnection();
            Chai.expect(connection.getUser()).to.equal(params["user"]);
            Chai.expect(connection.getPassword()).to.equal(params["password"]);
            Chai.expect(connection.getHost()).to.equal(params["host"]);
            Chai.expect(connection.getDatabasePort()).to.equal(params["port"]);
            Chai.expect(connection.getDatabaseName()).to.
                equal(params["dbName"]);
        })
    });

    describe("#customParameters", () => {
        it("Should read custom parameters", () => {
            let customParams : MongoConnection = new MongoConnection(
                "username",
                "password",
                "host",
                123123,
                "database"
            );

            let connection : MongoConnection = ChooseConfiguration
                .getConfig(customParams)
                .getMongoConnection();

            Chai.expect(connection.getUser()).to
                .equal(customParams["user"]);
            Chai.expect(connection.getPassword()).to
                .equal(customParams["password"]);
            Chai.expect(connection.getHost()).to
                .equal(customParams["host"]);
            Chai.expect(connection.getDatabasePort()).to
                .equal(customParams["port"]);
            Chai.expect(connection.getDatabaseName()).to
                .equal(customParams["dbName"]);
        })
    })
});
