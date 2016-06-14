import * as mongoose from "mongoose";
import Model from "./model";
import * as crypto from "crypto";

/**
 * Model to detain a unique code to register a user
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Luca Bianco | Create class | 14/06/2016 |
 *
 * @author Luca Bianco
 * @license MIT
 */
export interface CodeRegistrationDocument extends mongoose.Document {
    /**
     * @description code to activate the user
     */
    code : string,
    /**
     * @description Id of user to activate
     */
    user_id : string;
}

/**
 * Model to detain a unique code to register a user
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Luca Bianco | Create class | 14/06/2016 |
 *
 * @author Luca Bianco
 * @license MIT
 *
 */
export class CodeRegistrationModel extends Model {
    /**
     * @description Default constructor.
     */
    constructor() {
        super();
    }

    /**
     * @description Get the schema of the code registration model.
     * @returns {"mongoose".Schema} The schema of the code Registration.
     */
    protected getSchema() : mongoose.Schema {
        return new mongoose.Schema({
            code: {
                type: String,
                required: true,
                unique: true,
                default: crypto.randomBytes(20).toString("base64"),
            },
            user_id: {
                type: String,
                required: true,
                unique: true,
            }
        });
    }

    /**
     * @description
     * Get the model of the code registration model
     * @returns {Model<CodeRegistrationDocument>}
     * The model of the CodeRegistration
     */
    protected getModel() : mongoose.Model<CodeRegistrationDocument> {
        return this
            .getConnection()
            .model<CodeRegistrationDocument>("RegistrationCode",
                this.getSchema());
    }
}

export const company : CodeRegistrationModel = new CodeRegistrationModel();
