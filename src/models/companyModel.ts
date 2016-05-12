import * as mongoose from "mongoose";
import Model from "./model";
import CompanyDocument from "./companyDocument";

/**
 * CompanyModel implements the company business logic. It contains model and
 * schema defined by MongooseJS.
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Davide Rigoni | Create class | 03/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 *
 */
export default class CompanyModel extends Model {

    constructor() {
        super();
    }

    protected getSchema() : mongoose.Schema {
        return new mongoose.Schema({name: String, idOwner: String});
    }

    protected getModel() : mongoose.Model<CompanyDocument> {
        return mongoose.model<CompanyDocument>("Company", this.getSchema());
    }
}
