import * as mongoose from "mongoose";
import Model from "./model";

interface DatabaseDocument extends mongoose.Document {
    name : string,
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

class DatabaseModel extends Model {

    /**
     * @description Call the super constructor.
     * 
     * @return {DatabaseModel}
     * This
     */
    constructor () {

        super();
    }

    /**
     * @description Return a database from the identifier
     * 
     * @param identifier
     * 
     * @return // To choose
     */
    public getDatabase ( identifier : number ) : void {

        // TODO to implement
    }
}

export default DatabaseModel;
