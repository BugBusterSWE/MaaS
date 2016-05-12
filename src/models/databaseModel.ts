import * as m from "mongoose";
import Model from "./model";


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
    constructor() {

        super();

        this.model = this.getConnection()
            .getRawConnection()
            .model<DatabaseDocument>(
                "Database",
                DatabaseModel.schema
            );
    }

    protected getSchema() : m.Schema {
        return new m.Schema({
            name: String,
            idOwner: String,
            idDatabase: String
        });
    }
    
    protected getModel() : m.Model<DatabaseDocument> {
        return mongoose.model<DatabaseModel>("Database", this.getSchema());
    }
}

export default DatabaseModel;
