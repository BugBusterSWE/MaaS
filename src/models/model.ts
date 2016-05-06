import MongooseConnection from "./mongooseConnection";
import MongoConnection from "../config/mongoConnection";
import * as mongoose from "mongoose";
import {connection} from "mongoose";

/**
 * This is the base models class and contains some useful methods to perform
 * basic operations with MongoDB.
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Matteo Di Pirro | Create class     | 04/05/2016     |
 *
 * @author Matteo Di Pirro
 * @license MIT
 */
abstract class Model {
    /**
     * @description Mongoose connection
     */
    private connection : MongooseConnection;

    /**
     * @description Complete constructor.
     */
    constructor () {
        this.connection = MongooseConnection.getInstance();
    }

    /**
     * @description Return the connection to the MaaS's database.
     * @returns {MongooseConnection}
     */
    public getConnection() : MongooseConnection {
        return this.connection;
    }
}

export default Model;
