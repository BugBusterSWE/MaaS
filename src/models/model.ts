import MongooseConnection from "./mongooseConnection";
import * as mongoose from "mongoose";
import CustomModel from "./customModelInterface";

/**
 * Result document after any update. For more information about the meaning of
 * any attributes refer at the official documentation:
 * [Update#Output - MongoDB](http://bit.ly/1Ygx5UW)
 */
type MongoDBUpdate = {
    ok: Number,
    n: Number,
    nModified: Number,
    upserted: [{
        index: Number,
        _id: mongoose.Types.ObjectId
    }],
    writeErrors: [{
        index: Number,
        code: Number,
        errmsg: String
    }],
    writeConcernError: [{
        code: Number,
        errmsg: String
    }]
};

/**
 * This is the base models class and contains some useful methods to perform
 * basic operations with MongoDB.
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Matteo Di Pirro | Create class     | 04/05/2016     |
 * | Luca Bianco     | Fixed methods    | 10/05/2016     |
 *
 * @author Matteo Di Pirro
 * @license MIT
 */
abstract class Model {
    /**
     * @description Model representing the data in mongoose
     */
    protected model : mongoose.Model<CustomModel>;

    /**
     * @description Mongoose connection
     */
    private connection : MongooseConnection;

    /**
     * @description Schema of the model
     */
    private schema : mongoose.Schema;

    /**
     * @description Complete constructor.
     */
    constructor() {
        this.connection = MongooseConnection.getInstance();
        this.schema = this.getSchema();
        this.model = this.getModel();
    }

    /**
     * @description Return the connection to the MaaS's database.
     * @returns {MongooseConnection}
     */
    public getConnection() : MongooseConnection {
        return this.connection;
    }

    /**
     * @description Creates a new document into the database
     * @param jsonData{Object}
     * The object that contains the information to create the object
     * @returns {Promise<Object>}
     * Promise with the error or the saved data.
     */
    public create(jsonData : Object) : Promise<Object> {
        let concreteModel : CustomModel = new this.model(jsonData);
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            concreteModel.save((error : Object, data : Object) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * @description
     * Update the document specified by id with the data, in json format,
     * passed.
     * @param _id {string} Id of the document
     * @param jsonData {Object}
     * The content of data. The classes derived from *Model* apply the override
     * specify the structure of *jsonData*
     * @returns {Promise<MongoDBUpdate>}
     *
     */
    public update(_id : string, jsonData : Object) : Promise<MongoDBUpdate> {
        return new Promise<MongoDBUpdate>((
            resolve : (data : MongoDBUpdate) => void,
            reject : (error : Object) => void
        ) => {
            this.model.findOneAndUpdate(
                {_id: _id},
                {
                    $set: jsonData,
                    $inc: {__v: 1}
                },
                (error : Object, data : MongoDBUpdate) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
        });
    }

    /**
     * @description remove the document specified by the id
     *
     * @param _id
     *
     * @returns {Promise<Object>|Promise}
     */
    public remove(_id : string) : Promise<Object> {
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            this.model.findOneAndRemove(
                {_id: _id},
                (error : Object, data : Object) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
        });
    }

    /**
     * @description get the document specified by the id
     *
     * @param _id id of the document to return
     *
     * @returns {Promise<Object>|Promise}
     */
    public getOne(_id : string) : Promise<Object> {
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            this.model.findOne({_id: _id},
                (error : Object, data : Object) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
        })
    }

    /**
     * @description get all the documents for the model of the data
     *
     * @returns {Promise<Object>|Promise}
     */
    public getAll() : Promise<Object> {
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            this.model.find({},
                (error : Object, data : Object) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                })
        })
    }

    /**
     * @description Builds the schema of data using mongoose Schema.
     * @returns {mongoose.Schema} the schema built
     */
    protected abstract getSchema() : mongoose.Schema;

    /**
     * @description Returns the mongoose model representing the data into the
     * database
     * @returns {mongoose.Model} the model to use to manage data into the
     * database
     */
    protected abstract getModel() : mongoose.Model<CustomModel>;

}

export default Model;
