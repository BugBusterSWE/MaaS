import * as mongoose from "mongoose";
import Model from "./model";
import CompanyDocument from "./companyDocument";

type Promise<T> = mongoose.Promise<T>;

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
     * @description Company's schema
     */
    private static schema : mongoose.Schema =
        new mongoose.Schema({name: String, idOwner: String});

    /**
     * @description Company's model
     */
    private model : mongoose.Model<CompanyDocument>;

    /**
     * @description Complete constructor.
     */
    constructor () {
        super();
        this.model = this.getConnection().getRawConnection().
        model<CompanyDocument>("Company", CompanyModel.schema);
    }

    /**
     * @description Return the company's name and the id of the owner
     * @param name The name of the company
     * @return {Promise<CompanyDocument>}
     * The promise for the Company's document.
     */
    public getCompanyById(companyId : string) : Promise<CompanyDocument> {
        return this.model.findById(companyId).exec();
    };

    /**
     * @description Update the data of the company
     * @param id The id of the company to update
     * @param company The new company's data
     * @return {Promise<Object>}
     * Promise to the returned document after the operation. To more
     * information about the structure of document refer to the official
     * documentation: [Update#Output - MongoDB](http://bit.ly/1Ygx5UW)
     */
    public update(id : string, company : CompanyDocument) : Promise<Object> {
        return this.model.update({_id : id}, {
            name : company.name,
            idOwner : company.idOwner
        }).exec();
    };

    /**
     * Delete the company represented by the id
     * @param id The id of the company to remove
     * @returns {Promise<Object>} Promise to the null returned document.
     * Define **only** the *onReject* function.
     */
    public delete(id : string) : Promise<Object> {
        return this.model.remove({_id : id}).exec();
    };

    /**
     * @description Create a new company
     * @param name Company's name
     * @param email Owner's email
     * @param password Owner's password
     * @returns {Promise<function(Result): void>}
     * Promise of the request to save the document into the database. The
     * template param *Result* defines the param type when the promise
     * has resolved.
     */
    public createCompany<Result>(company : CompanyDocument) :
    Promise<(data : Result) => void> {
        return new mongoose.Promise<(data : Result) => void>((
            reject : (err : Object) => void, // Object is better than any
            resolve : (data : Result) => void
        ) => {
            let copy : CompanyDocument = new this.model({
                name : company.name,
                idOwner: company.idOwner
            });

            // @todo Must create the owner

            // Save Document
            copy.save<Result>((err : Object, data : Result) => {
                if (err !== undefined) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * @description Return a list of all the MaaS companies
     * @return {Promise<CompanyDocument[]>} A promise which contains the
     * companies.
     */
    public getCompanies () : Promise<CompanyDocument[]> {
        return this.model.find({}).exec();
    }
}

export default CompanyModel;

