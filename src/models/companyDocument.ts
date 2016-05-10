/**
 * CompanyDocument defines an interface which stores the Company attributes.
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Davide Rigoni | Create class | 10/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 *
 */
import * as mongoose from "mongoose";

interface CompanyDocument extends mongoose.Document {
    name : string,
    idOwner : string;
}

export default CompanyDocument;
