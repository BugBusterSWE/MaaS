/**
 * This is a Singleton class used for perform a connection with a MongoDB
 * database.
 *
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Matteo Di Pirro | Create class     | 04/05/2016     |
 *
 * @author Matteo Di Pirro
 * @license MIT
 */

import * as mongoose from "mongoose";
import MongoConnection from "../config/mongoConnection";
import ConfigurationChooser from "../config/index";
import Configuration from "../config/configuration";

/**
 * This is a class used for connect to the MongoDB database of the application.
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Matteo Di Pirro | Create class     | 04/05/2016     |
 *
 * @author Matteo Di Pirro
 * @license MIT
 */
class MongooseConnection {
    /**
     * @description Connection to the db
     */
    private connection : mongoose.Connection;

    /**
     * @description The static instance
     */
    private static instance : MongooseConnection;

    /**
     * @description Return the instance of the connection.
     * @returns {MongooseConnection} The instance
     */
    public static getInstance() : MongooseConnection {
        if (! MongooseConnection.instance) {
            MongooseConnection.instance = new MongooseConnection(
                ConfigurationChooser.getConfig().getMongoConnection()
            );
        }
        return MongooseConnection.instance;
    }

    /**
     * @description Close the connection.
     */
    public disconnect() : void {
        this.connection.close();
    }

    /**
     * @description Return the raw Mongoose connection.
     * @returns {mongoose.Connection} The connection to MaaS's database.
     */
    public getRawConnection() : mongoose.Connection {
        return this.connection;
    }

    /**
     * @description Complete private constructor according to the Singleton
     * pattern
     * @param connection The parameters for the connection
     */
    constructor(connection : MongoConnection) {
        if (MongooseConnection.instance) {
            throw new Error("Attempt to create two instances of this" +
                " Singleton. Please use getInstance() method");
        }
        let connectionString : string = "mongodb://" + connection.getUser() +
            ":" + connection.getPassword() + "@" + connection.getHost() + ":" +
            connection.getDatabasePort() + "/" + connection.getDatabaseName();
        this.connection = mongoose.createConnection(connectionString);
    }
}

export default MongooseConnection;
