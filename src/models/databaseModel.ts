import * as mongoose from "mongoose";
import * as mongodb from "mongodb";
import Model from "./model";
import CustomModel from "./customModelInterface";

/**
 * DatabaseModel is a interface that represent the document on MongoDB.
 *
 * @history
 * | Author         | Action Performed | Data       |
 * | ---            | ---              | ---        |
 * | Davide Polonio | Create interface | 09/05/2016 |
 *
 * @author Davide Polonio
 * @copyright MIT
 */
export interface DatabaseDocument extends CustomModel {
    /**
     * @description Represent the company name.
     */
    name : string,
    /**
     * @description Represent the owner id ( the Company that owns the db).
     */
    id_company : string,
    /**
     * @description Represent the username to access to the database.
     */
    username : string,
    /**
     * @description Represent the password to access to the database.
     */
    password : string,
    /**
     * @description Represent the address host where is install the database.
     */
    host : string,
    /**
     * @description Represent the name of database.
     */
    dbName : string
}


/**
 * DatabaseModel manage all connections to MongoDB companies databases.
 * Implements model and schema of MongooseJS.
 *
 * This model represent a connection to a company.
 *
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Davide Polonio | Create class | 06/05/2016 |
 *
 * @author Davide Polonio
 * @copyright MIT
 */
export class DatabaseModel extends Model {
    /**
     * @description
     * <p>This constructor calls his super constructor. After it gets the
     * database connection and puts it in model. </p>
     * @return {DatabaseModel}
     * This.
     */
    constructor() {
        super();
    }

    /**
     * @description Gets All the databases for a company
     * @param company_id
     * @returns {Promise<Object>|Promise}
     */
    public getAllForCompany(company_id : string) : Promise<Object> {
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            this.model.find({id_company: company_id},
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
     * @description Create a new database for the stated Company.
     * @param jsonData data of the new database.
     * @returns {Promise<Object>}
     * Promise with the error or the saved data.
     * @override
     */
    public create(jsonData : Object) : Promise<Object> {
        let self : DatabaseModel = this;

        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            self
                .getCollections(
                    jsonData["port"],
                    jsonData["host"],
                    jsonData["username"],
                    jsonData["password"],
                    jsonData["dbName"]
                )
                .then(function (collections : Array<Object>) : void {
                    jsonData["collections"] = collections;
                    self
                        .superCreate(jsonData)
                        .then((data : Object) => {
                                resolve(data);
                            },
                            (error : Object) => {
                                reject(error);
                            });
                }, (err : Object) => {
                    reject(err);
                });
        });


    }

    /**
     * @description Update the stated Company databases.
     * @param _id The id of the Company.
     * @param jsonData Data of the new database.
     * @returns {Promise<Object>}
     * Promise with the error or the saved data.
     */
    public update(_id : string, jsonData : Object) : Promise<Object> {
        let self : DatabaseModel = this;

        console.log("In the databaseModel update");
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {

            self
                .getCollections(
                    jsonData["port"],
                    jsonData["host"],
                    jsonData["username"],
                    jsonData["password"],
                    jsonData["dbName"]
                )
                .then(function (collections : Array<Object>) : void {
                    jsonData["collections"] = collections;
                    self.superUpdate(_id, jsonData)
                        .then((data : Object) => {
                            resolve(data);
                        }, (error : Object) => {
                            reject(error);
                        });
                }, (err : Object) => {
                    reject(err);
                });
        });
    }


    /**
     * @description Remove all datanase of a company specified by the id
     * @param company_id Remove the element with the stated company.
     * @returns {Promise<Object>|Promise} Promise generated by the
     * mongoose's query.
     */
    public removeAllDatabasesOfACompany(
        company_id : string
    ) : Promise <Object> {
        return new Promise((resolve : () => void,
                            reject : (error : Object) => void) => {
            this.model.remove(
                {id_company: company_id},
                (error : Object) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
        });
    }

    /**
     * @description Get the database's schema.
     * @returns {mongoose.Schema} The schema.
     * @override
     */
    protected getSchema() : mongoose.Schema {
        return new mongoose.Schema({
            dbName: String,
            host: String,
            port: String,
            username: String,
            password: String,
            id_company: String,
            idDatabase: String,
            collections: [String]
        });
    }

    /**
     * @description Return the database's model.
     * @returns {Model<DatabaseDocument>} The model.
     * @override
     */
    protected getModel() : mongoose.Model<DatabaseDocument> {
        return this
            .getConnection()
            .model<DatabaseDocument>("Database", this.getSchema());
    }

    /**
     * @description Return the collection's list of the stated database.
     * @param port Database's port.
     * @param host Database's host.
     * @param username Database's user username.
     * @param password Database's user password.
     * @param dbName Database's name.
     * @returns {Promise<Object>|Promise} Promise
     * generated by a mongoose's query.
     */
    private getCollections(port : string, host : string,
                           username : string, password : string,
                           dbName : string) : Promise<Object> {

        // Connect to the database:
        // Create the string
        let connectionString : string =
            "mongodb://" + username +
            ":" + password +
            "@" + host +
            ":" + port +
            "/" + dbName;
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            // And use it to connect
            mongodb.MongoClient.connect(connectionString,
                (error : Object, database : mongodb.Db) => {
                    if (error || (!error && !database)) {
                        reject(error);
                    } else {
                        database
                            .listCollections({})
                            .toArray((listError : Object,
                                      items : Array<{name : string,
                                                     options : {}}>) => {
                                if (listError) {
                                    return reject(listError);
                                }
                                let arrayNames : Array<string> = [];
                                for (let i : number = 0;
                                     i < items.length; i++) {
                                    arrayNames.push(items[i].name);
                                }
                                database.close();
                                resolve(arrayNames);
                            });

                    }
                });

        });
    }

    /**
     * @description
     * <p>Method used for invoke the base class create method from a callback
     * function.</p>
     * @param jsonData Data of the database.
     * @returns {Promise<Object>}
     * Promise with the error or the saved data
     */
    private superCreate(jsonData : Object) : Promise<Object> {
        return super.create(jsonData)
    }

    /**
     * @description
     * <p>Method used for invoke the base class update method from a callback
     * function.</p>
     * @param _id The id of the company
     * @param jsonData Data of the database.
     * @returns {Promise<Object>}
     * Promise with the error or the saved data
     */
    private superUpdate(_id : string,
                        jsonData : Object) : Promise<Object> {
        return super.update(_id, jsonData);
    }
}

export const database : DatabaseModel = new DatabaseModel();
