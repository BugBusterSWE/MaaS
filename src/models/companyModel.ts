import * as mongoose from "mongoose";
import Model from "./model";

/**
 * CompanyDocument defines an interface which stores the Company attributes.
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Andrea Mantovani | Insert comment above properties | 12/05/2016 |
 * | Davide Rigoni | Create class | 10/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
export interface CompanyDocument extends mongoose.Document {
    /**
     * @description Company's name
     */
    name : string,
    /**
     * @description Id of company's owner
     */
    idOwner : string;
}

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
export class CompanyModel extends Model {
    /**
     * @description Default constructor.
     */
    constructor() {
        super();
    }

    /**
     * @description Get the schema of the company model.
     * @returns {"mongoose".Schema} The schema of the Company.
     * @override
     */
    protected getSchema() : mongoose.Schema {
        return new mongoose.Schema({name: String, idOwner: String});
    }

    /**
     * @description
     * Get the model of the company model instantiated by Company's schema
     * @returns {Model<CompanyDocument>}
     * The model of the Company
     * @override
     */
    protected getModel() : mongoose.Model<CompanyDocument> {
        return mongoose.model<CompanyDocument>("Company", this.getSchema());
    }
}

export const company : CompanyModel =  new CompanyModel();
