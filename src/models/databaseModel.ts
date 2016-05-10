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
    idOwner : string;
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
        idOwner: String
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
     * @description Return a database from the identifier
     * 
     * @param identifier {number}
     * 
     * @return {m.Promise<DatabaseDocument[]>}
     */
    public getDatabase ( identifier : number ) : m.Promise<DatabaseDocument[]> {

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
     * <p>Add a database to the model. You need a DatabaseDocument.
     * This class create a local copy and insert the Database name and the
     * owner id.</p>
     * 
     * @param db {DatabaseDocument}
     */
    public createDb ( db : DatabaseDocument ) : void {

        let copy : DatabaseDocument = new this.model({
            name: db.name,
            idOwner: db.idOwner
        });
        copy.save();
    }
}

export default DatabaseModel;
