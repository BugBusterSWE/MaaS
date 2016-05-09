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
     * definition declared in the DSLDocument interface.
     */
    private static schema : m.Schema = new m.Schema({
        name: String,
        idOwner: String
    });

    /**
     * Model's dsl
     */
    private model : m.Model<DatabaseDocument>;


    /**
     * @description Call the super constructor.
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
     * @param identifier
     * 
     * @return // To choose
     */
    public getDatabase ( identifier : number ) : m.Promise<DatabaseDocument[]> {

        return this.model
            /*
             Get all relative DSL document where the user is show in the
             permissions table
             */
            .find({
                idOwner: identifier
            })
            /*
             Exec query
             */
            .exec();
    }
}

export default DatabaseModel;
