/**
 * This is a test for the ChooseConfiguration class.
 */

import ChooseConfiguration from "../../src/config/index";
import * as Chai from "chai"; // You need assertions. Trust me.

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
});
