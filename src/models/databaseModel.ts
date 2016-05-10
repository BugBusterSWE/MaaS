import * as m from "mongoose";
import Model from "./model";


/**
 * DatabaseModel is a interface that represent the document on MongoDB.
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Davide Polonio | Create interface| 09/05/2016 |
 *
 * @author Davide Polonio
 * @copyright MIT
 *
 *
 */

export interface DatabaseDocument extends m.Document {
    /**
     * @description Represent the company name.
     */
    name : string,
    /**
     * @description Represent the owner id.
     */
    idOwner : string,
    /**
     * @description Represent the database id.
     */
    idDatabase : string;
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
 *
 *
 */

export class DatabaseModel extends Model {

    /**
     * Schema of the collection in the MongoDB database. It follows the
     * definition declared in the DatabaseDocument interface.
     */
    private static schema : m.Schema = new m.Schema({
        name: String,
        idOwner: String,
        idDatabase: String
    });

    /**
     * Model's Database
     */
    private model : m.Model<DatabaseDocument>;


    /**
     * @description 
     * <p>This constructor calls his super constructor. After it gets the
     * database connection and puts it in model. </p>
     * 
     * @return {DatabaseModel}
     * This
     */
    constructor () {

        super();

        this.model = this.getConnection()
            .getRawConnection()
            .model<DatabaseDocument>(
            "Database",
            DatabaseModel.schema
        );
    }

    /**
     * @description Return a list of databases from a company identifier
     * 
     * @param identifier {string} The company identifier
     * 
     * @return {m.Promise<DatabaseDocument[]>}
     */
    public getDatabase ( identifier : string ) : m.Promise<DatabaseDocument[]> {

        return this.model
            /*
             * Get all relative Database document of a company
             */
            .find({
                idOwner: identifier
            })
            /*
             * Exec query
             */
            .exec();
    }

    /**
     * @description
     * <p>Return a single database from the company identifier and from the id
     * of the database</p>
     *
     * @param idCompany {string} The id of the company
     * @param idReqDatabase {string} The id of the request database
     *
     * @return {m.Promise<DatabaseDocument>}
     */
    public getDatabaseById (
        idCompany : string,
        idReqDatabase : string
    ) : m.Promise<DatabaseDocument> {

        return this.model
            /*
             * Get a single database
             */
            .findOne({
                idOwner: idCompany,
                idDatabase: idReqDatabase
            })
            .exec();
    }

    /**
     * @description
     * <p>Add a database to the model. You need a DatabaseDocument.
     * This class create a local copy and insert the Database name and the
     * owner id.</p>
     * 
     * @param db {DatabaseDocument} The document to create
     *
     * @return {m.Promise<(data : Result)>}
     */
    public createDb<Result>( db : DatabaseDocument) :
    m.Promise<(data : Result) => void> {
        return new m.Promise<(data : Result) => void>((
            reject : (err : Object) => void, // Object is better than any
            resolve : (data : Result) => void
        ) => {
            let copy : DatabaseDocument = new this.model({
                name: db.name,
                idOwner: db.idOwner
            });

            // Save Document
            copy.save<Result>((err : Object, data : Result) => {
                if (err !== undefined) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * @description This method update a database with a new DatabaseDocument
     *
     * @param idDb {string} The id of the database to update
     * @param newInfo {DatabaseDocument} The new information to insert
     * 
     * @returns {Promise<Object>}
     */
    public updateDb (
        idDb : string,
        newInfo : DatabaseDocument
    ) : m.Promise<Object> {

        return this.model.update({idOwner: idDb}, {
            name: newInfo.name,
            idOwner: newInfo.idOwner,
            idDatabase: newInfo.idDatabase
        }).exec();
    }

    /**
     * @description This method delete the selected database
     * 
     * @param idCompany {string} The id of the company
     * @param idReqDatabase {string} The id of the database to delete
     * @returns {Promise<{}>|Promise<Object>}
     */
    public deleteDb (
        idCompany : string,
        idReqDatabase : string
    ) : m.Promise<Object> {

        return this.model.remove({
            idOwner: idCompany,
            idDatabase: idReqDatabase
        }).exec();
    }
}

export default DatabaseModel;
