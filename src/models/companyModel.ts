import * as promise from "es6-promise";
import * as mongoose from "mongoose";
import Model from "Model";

/**
 * This class define the company business logic. It contains model and scheme
 * defined by MongooseJS.
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
class CompanyModel extends Model{
    /**
     * @description company's name
     */
    private name : string;

    /**
     * @description id of the company's owner
     */
    private idOwner : string;

    /**
     * @description Schema's company
     */
    private companySchema;

    /**
     * @description model's company
     */
    private company;

    /**
     * @description Constructor. It connect with the DB to find the company
     * @param name
     * @param idOwner
     * @return {CompanyModel}
     */
    constructor (name : string, idOwner : string) {

        this.name = name;
        this.idOwner = idOwner;

        this.companySchema = this.getConnection().Schema({
            name: String,
            idOwner: String
        });

        this.company = this.getConnection().model("Company",
            this.companySchema);
    }

    /**
     * @description Return the company's name and idOwner
     * @param name
     */
    public getCompany(name : string) : CompanyModel{
        return this.company.findOne({name: this.name},
                function (err, user) {
                    // TODO: Something to return
        });
    };

    /**
     * @description Update the data of the company
     * @param company model
     */
    public update(company : CompanyModel) : void {
        return this.company.findOneAndUpdate(
            {name: this.name, idOwner: this.idOwner},
            c, function (err, user) {
            // TODO: Something to update
        });
    };

    /**
     * @description Delete the company from the DB
     */
    public delete() : void {
        return this.company.findOneAndRemove(
            {name: this.name, idOwner: this.idOwner}, function (err, user) {
                // TODO: Something to delete
        });
    };

    /**
     * @description Create a new company into DB and return it
     * @param name is the company's name
     * @param email is the owner's email
     * @param password is the owner's password
     * @return {CompanyModel}
     */
    static public createCompany(name : CompanyModel, email : string,
                                password : string) : CompanyModel{
    // TODO: make a company and save it
    }

    /**
     *  @description find a company in the DB
     *  @param name of the company
     *  @return {CompanyModel}
     */
    static private findCompany(name : string) : CompanyModel{
        // TODO: find a company and return it or give error
    };


}
