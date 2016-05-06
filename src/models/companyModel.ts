import * as promise from "es6-promise";
import * as mongoose from "mongoose";
import {Model} from "mongoose";

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
    name : string;
    idOwner : string;

    /**
     * @description constructor
     * @param name
     * @param idOwner
     * @return {CompanyModel}
     */
    constructor (name : string, idOwner : string) {
        this.name = name;
        this.idOwner = idOwner;

        //verifico se esiste la company
    }

    public getCompany(name : string) : CompanyModel{
        //return json
    }

    public update(c : CompanyModel) : void {
        //return json
    }

    public delete() : void {
        //return json
    }



    static private findCompany(name : string) : CompanyModel{
        //return json
    }

    static public createCompany(c : CompanyModel, e : string,
                                p : string) : CompanyModel {
        //create user
        //return json
    }


}
