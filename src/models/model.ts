import {MongooseConnection} from "./mongooseConnection";
import * as mongoose from "mongoose";

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
export abstract class Model {
    /**
     * @description Model's schema
     */
    private schema : mongoose.Schema;

    /**
     * @description Reference to the Mongoose Model
     */
    private model : mongoose.Model;

    /**
     * @description Complete constructor.
     * @param mongooseConnection An object which performs the connection
     * with the MongoDB database
     */
    constructor (mongooseConnection : MongooseConnection) {
        this.schema = this.buildSchema(mongooseConnection);
        this.model = mongooseConnection.model(this.getModelName(), this.schema);
    }

    /**
     * @description Create a new element in a Collection of the db.
     * @param data A string which represents a JSON object used for insert
     * data in a Collection.
     * @returns {mongoose.Promise} The promise returned by the execution of
     * the request to Mongoose.
     */
    public create (data : string) : mongoose.Promise {
        return this.model.create(JSON.parse(data));
    }

    /**
     * @description Remove an element in a Collection of the db.
     * @param id Element's id.
     * @returns {mongoose.Promise} The promise returned by the execution of
     * the request to Mongoose.
     */
    public remove (id : string) : mongoose.Promise {
        return this.model.remove(id);
    }

    /**
     * @description Return a specific element of the Collection. This
     * element has to have an the id _id.
     * @param id Element's id.
     * @returns {mongoose.Promise} The promise returned by the execution of
     * the request to Mongoose.
     */
    public getOne (id : string) : mongoose.Promise {
        let query : mongoose.Query = this.model.findOne({_id : id});
        return query.exec();
    }

    /**
     * @description Return every element of the Collection, without
     * restrictions.
     * @returns {mongoose.Promise} The promise returned by the execution of
     * the request to Mongoose.
     */
    public getAll () : mongoose.Promise {
        let query : mongoose.Query = this.model.find({});
        return query.exec();
    }

    /**
     * @description Update a specific element of the Collection. This
     * element has to have an the id _id.
     * @param id Element's id.
     * @returns {mongoose.Promise} The promise returned by the execution of
     * the request to Mongoose.
     */
    public update (id : string, data : string) : mongoose.Promise {
        let query : mongoose.Query = this.model.findOneAndUpdate(
            {_id : id},
            data
        );
        return query.exec();
    }

    /**
     * Return the model's name.
     * @returns {string} The model's name.
     */
    protected abstract getModelName() : string;

    /**
     * Return the Schema of the Collection.
     * @param connection The connection to the db
     * @returns {mongoose.Schema} The Schema.
     */
    protected abstract buildSchema(
        connection : MongooseConnection
    ) : mongoose.Schema;
}
