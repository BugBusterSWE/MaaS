/**
 * This is a Singleton class used for perform a connection with a MongoDB
 * database.
 *
 * * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Matteo Di Pirro | Create class     | 04/05/2016     |
 *
 * @author Matteo Di Pirro
 * @license MIT
 */

import * as mongoose from "mongoose";

export class MongooseConnection {
    /**
     * @description Connection to the db
     */
    private connection : mongoose.Connection;

    /**
     * @description The static instance
     */
    private static instance : MongooseConnection;

    /**
     * @description Complete private constructor according to the Singleton
     * pattern
     * @param connection The parameters for the connection
     */
    private constructor(connection : MongoDBConnection) {
        let connectionString : string = "mongodb://" + connection.getUser() +
            ":" + connection.getPassword() + "@" + connection.getHost() + ":" +
            connection.getPort() + "/" + connection.getDatabaseName();
        this.connection = mongoose.createConnection(connectionString);
    }

    /**
     * @description Return the instance of the connection.
     * @returns {MongooseConnection} The instance
     */
    public static getInstance() : MongooseConnection {
        if (! MongooseConnection.instance) {
            MongooseConnection.instance = MongooseConnection(
                ConfigurationChooser.getConfig().getConnection()
            );
        }
        return MongooseConnection.instance;
    }

    /**
     * @description Close the connection.
     */
    public disconnect() : void {
        connection.close();
    }
}
