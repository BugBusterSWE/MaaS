import * as mongoose from "mongoose";
import Model from "./model";

type Promise<T> = mongoose.Promise<T>;
type DSLSchema = {
    permission : [{user : String, read : Boolean, exec : Boolean}],
    content : String
};

/**
 * Define the form of a permission of a user on the DSL.
 *
 * @history
 * | Author             | Action Performed | Data       |
 * | ---                | ---              | ---        |
 * | Andrea Mantovani   | Create interface | 07/05/2016 |
 *
 * @author Andrea Mantovani
 * @license MIT
 */
export interface PermissionOnDSL {
    /**
     * @description
     * User's ID
     */
    user : string;

    /**
     * @description
     * Set the permission of read a DSL
     */
    read : boolean;

    /**
     * @description
     * Set the permission of execute a DSL
     */
    exec : boolean;
}

/**
 * Define the attribute of a dsl's document.
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Andrea Mantovani | Create interface | 08/05/2016 |
 *
 * @author Andrea Mantovani
 * @license MIT
 */
export interface DSLDocument extends mongoose.Document {
    /**
     * @description
     * Register of users with access to the DSL
     */
    permission : Array<PermissionOnDSL>,
    /**
     * @description
     * Code of the DSL
     */
    content : string;
}

/**
 * DSLModel implements the dsl business logic. It contains model and scheme
 * defined by MongooseJS.
 * @history
 *
 * <table>
 *  <tr><td>Author</td><td>Action Performed</td><td>Data</td></tr>
 *  <tr>
 *      <td>Andrea Mantovani</td>
 *      <td>
 *          Add methods:
 *          <ul>
 *              <li>*get*</li>
 *              <li>*getAll*</li>
 *              <li>*add*</li>
 *              <li>*update*</li>
 *              <li>*delete*</li>
 *          </ul>
 *      </td>
 *      <td>08/05/2016</td>
 *  </tr>
 *  <tr><td>Andrea Mantovani</td><td>Create class</td><td>07/05/2016</td></tr>
 * </table>
 *
 * @author Andrea Mantovani
 * @license MIT
 */
export class DSLModel extends Model {

    /**
     * Default constructor.
     * @return {DSLModel}
     * This.
     */
    constructor() {
        super();
    }

    /**
     * @description Get the dsl's schema.
     * @returns {"mongoose".Schema} The schema.
     * @override
     */
    protected getSchema() : mongoose.Schema {
        return new mongoose.Schema({
            permission: [{user: String, read: Boolean, exec: Boolean}],
            content: String
        });
    }

    /**
     * @description Get the dsl's model.
     * @returns {"mongoose".Schema} The model.
     * @override
     */
    protected getModel() : mongoose.Model<DSLDocument> {
        return mongoose.model<DSLDocument>("DSL", this.getSchema());
    }
}
