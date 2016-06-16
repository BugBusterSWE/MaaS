import * as request from "superagent";
import {Response} from "superagent";
import * as crypto from "crypto-js";
import {IAddCompanyUser, ICompanyName, IAddMemberUser, IAddCompanyResponse,
        IAddMemberResponse,
        ICompanyResponse} from "../actions/companyActionCreator";
import {ActionError} from "../dispatcher/dispatcher";

// TODO: Remove console.log function and check for reject and resolve error
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
                .end(function(error : Object, res : Response) : void {
                    if (error) {
                        console.log("Error: " + JSON.stringify(error));
                        let actionError : ActionError = res.body;
                        reject(actionError);
                    } else {
                        console.log("No Error: " + JSON.stringify(res));
                        resolve(res.body);
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
                .end(function(error : Object, res : Response) : void {
                    if (error) {
                        console.log("Error: " + JSON.stringify(error));
                        let actionError : ActionError = res.body;
                        reject(actionError);
                    } else {
                        console.log("No Error: " + JSON.stringify(res));
                        resolve(res.body);
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
            let encript1 : string = crypto.SHA256(
                memberData.password, "BugBusterSwe").toString();
            memberData.password = crypto.SHA256(encript1, "MaaS").toString();
            alert(memberData.password);
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
     * @param company {ICompanyName} Company data
     * @param token {string} Token of the user
     * @returns {Promise<T>|Promise} the result or the error
     */
    public addCompany(user : IAddCompanyUser,
               company : ICompanyName,
               token : string) : Promise<Object> {
        let encript1 : string = crypto.SHA256(
            user.password, "BugBusterSwe").toString();
        user.password = crypto.SHA256(encript1, "MaaS").toString();
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
     * @param companyName {ICompanyName} Data of the owner of the company.
     * @param token {string} Token of the user.
     * @param company_id {string} ID of the company.
     * @returns {Promise<T>|Promise} the result or the error.
     */
    public updateCompany(companyName : ICompanyName,
                         token : string,
                        company_id : string) : Promise<Object> {
        console.log("company API");
        return new Promise(
            function(resolve : (jsonObject : ICompanyResponse ) => void,
                     reject : (error : Object) => void) : void {
                request
                    .put("/api/companies/" + company_id)
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
                                ICompanyResponse = res.body;
                            resolve(updateCompanyResponse);
                        }
                    });
            })
    }
}

let companyAPIs : CompanyAPIs = new CompanyAPIs();
export default companyAPIs;

