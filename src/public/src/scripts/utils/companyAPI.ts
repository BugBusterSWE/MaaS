import * as request from "superagent";
import {Response} from "superagent";
import {IAddCompanyUser, IAddCompanyName, IAddMemberUser, IAddCompanyResponse,
        IAddMemberResponse} from "../actions/companyActionCreator";
import {ActionError} from "../dispatcher/dispatcher";

// TODO: Remove console.log function
/**
 * <p>This class represents the APIs used by {CompanyActionCreator}.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class CompanyAPIs {

    /**
     * @description
     * <p>This method send a request to the backend of MaaS with the purpose
     * to obtain the companies data.</p>
     * @param token {string} Token of the user
     * @returns {Promise<T>|Promise} The result or the error
     */
    public getCompaniesData(token : string) : Promise<Object> {

        return new Promise(
            function (resolve : (value : Response) => void,
                      reject : (error : Object) => void) : void
            {
            request
                .get("/api/admin/companies")
                .set("Content-Type', 'application/json")
                .set("x-access-token", token)
                .end(function(error : Object, result : Response) : void {
                    console.log(JSON.stringify(result));
                    if (result) {
                        resolve(result.body);
                    } else {
                        reject(error);
                    }
                });
        });
    }

    /**
     * @description
     * <p>This method send a request to the backend of MaaS with the purpose
     * to obtain all members of the one company.</p>
     * @param company_id {string} ID of the company
     * @param token {string} Token of the user
     * @returns {Promise<T>|Promise} The result or the error
     */
    public getCompaniesMembers(company_id : string,
                               token : string) : Promise<Object> {

        return new Promise(
            function (resolve : (value : Response) => void,
                      reject : (error : Object) => void) : void {
            request
                .get("/api/companies/" +
                        company_id + "/users")
                .set("x-access-token", token)
                .end(function(error : Object, result : Response) : void {
                    if (result) {
                        resolve(result.body);
                    } else {
                        reject(error);
                    }
                });
        });
    }

    /**
     * @description
     * <p>This method send a request to the backend of MaaS with the purpose
     * to add one member to one company.</p>
     * @param company_id {string} ID of the company
     * @param token {string} Token of the user
     * @param memberData {IAddMemberUser} New member data
     * @returns {Promise<T>|Promise} The result or the error
     */
    public addNewMember(
        company_id : string, token : string,
        memberData : IAddMemberUser) : Promise<Object> {
            return new Promise(
                function(resolve : (jsonObject : IAddMemberResponse) => void,
                        reject : (error : Object) => void) : void {
                request
                    .post
                    ("/api/companies/" + company_id + "/users")
                    .set("Accept", "application/json")
                    .set("x-access-token", token)
                    .send(memberData)
                    .end(function(error : Object, res : Response) : void {
                        if (error) {
                            console.log("Error: " + JSON.stringify(error));
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            console.log("No Error: " + JSON.stringify(res));
                            let addCompanyResponse : IAddMemberResponse =
                                res.body;
                            resolve(addCompanyResponse);
                        }
                });
            });
    }

    /**
     * @description
     * <p>This method send a request to the backend of MaaS with the purpose
     * to add one company.</p>
     * @param user {IAddCompanyUser} Data of the owner of the company
     * @param company {IAddCompanyName} Company data
     * @param token {string} Token of the user
     * @returns {Promise<T>|Promise} the result or the error
     */
    public addCompany(user : IAddCompanyUser,
               company : IAddCompanyName,
               token : string) : Promise<Object> {
        console.log("company API");
        console.log(user.email);
        console.log(company.name);
        return new Promise(
            function(resolve : (jsonObject : IAddCompanyResponse ) => void,
                     reject : (error : Object) => void) : void {
            request
                .post("/api/admin/companies")
                .set("x-access-token", token)
                .send({user, company})
                .end(function(error : Object, res : Response) : void {
                    if (error) {
                        console.log("Error: " + JSON.stringify(error));
                        let actionError : ActionError = res.body;
                        reject(actionError);
                    } else {
                        console.log("No Error: " + JSON.stringify(res));
                        let addCompanyResponse : IAddCompanyResponse = res.body;
                        resolve(addCompanyResponse);
                    }
                });
        })
    }

    /**
     * @description
     * <p>This method send a request to the backend of MaaS with the purpose
     * to update one company.</p>
     * @returns {Promise<T>|Promise} the result or the error
     */
    public updateCompany(companyName : string,
                         token : string) : Promise<Object> {
        console.log("company API");
        return new Promise(
            function(resolve : (jsonObject : Object ) => void,
                     reject : (error : Object) => void) : void {
                request
                    .post("/api/admin/companies")
                    .set("x-access-token", token)
                    .send(companyName)
                    .end(function(error : Object, res : Response) : void {
                        if (error) {
                            console.log("Error: " + JSON.stringify(error));
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            console.log("No Error: " + JSON.stringify(res));
                            let updateCompanyResponse :
                                Object = res.body;
                            resolve(updateCompanyResponse);
                        }
                    });
            })
    }

}

let companyAPIs : CompanyAPIs = new CompanyAPIs();
export default companyAPIs;

