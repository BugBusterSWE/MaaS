import * as mongoose from "mongoose";
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
 *
 *
 */

export interface DatabaseDocument extends CustomModel {
    /**
     * @description Represent the company name.
     */
    name : string,
    /**
     * @description Represent the owner id.
     */
    idOwner : string,

    username : string,

    password : string,

    host : string,

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
 *
 *
 */

export class DatabaseModel extends Model {

    /**
     * @description
     * <p>This constructor calls his super constructor. After it gets the
     * database connection and puts it in model. </p>
     *
     * @return {DatabaseModel}
     * This
     */
    constructor() {

        super();

        this.model = this.getConnection()
            .getRawConnection()
            .model<DatabaseDocument>(
                "Database",
                this.getSchema()
            );
    }

    public create(jsonData : Object) : void {
        this
            .getCollections(
                jsonData.port,
                jsonData.host,
                jsonData.username,
                jsonData.password,
                jsonData.dbName
            )
            .then(function (collections : Array<Object>) {
                jsonData.collections = collections;
                super.create(jsonData);
            })
    }

    public update(_id : string, jsonData : Object) : void {
        this
            .getCollections(
                jsonData.port,
                jsonData.host,
                jsonData.username,
                jsonData.password,
                jsonData.dbName
            )
            .then(function (collections : Array<Object>) {
                jsonData.collections = collections;
                super.update(_id, jsonData);
            })
    }

    protected getSchema() : m.Schema {
        return new m.Schema({
            name: String,
            idOwner: String,
            idDatabase: String,
            collections: []
        });
    }

    protected getModel() : m.Model<DatabaseDocument> {
        return mongoose.model<DatabaseModel>("Database", this.getSchema());
    }

    private getCollections(port : string, host : string,
                           username : string, password : string,
                           dbName : string) : Array<Object> {

        let connectionString : string =
            "mongodb://" + username +
            ":" + password +
            "@" + host +
            ":" + port +
            "/" + dbName;

        let mongooseTemporaryConnection : mongoose =
            mongoose.connection(connectionString);
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {

            // Richiedo i nomi delle connessioni

            mongooseTemporaryConnection.db.collectionNames(
                function (err : Object, names : Array<Object>) : void {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(names);
                    }
                });
        });


    }
}

export default DatabaseModel;
