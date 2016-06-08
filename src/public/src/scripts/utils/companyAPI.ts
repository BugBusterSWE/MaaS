import * as request from "superagent";
import {Response} from "superagent";
import {IAddCompanyUser,
        IAddCompanyName,
        IAddMemberUser,
        IAddCompanyResponse} from "../actions/companyActionCreator";
import {ActionError} from "../dispatcher/dispatcher";

class CompanyAPIs {

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

    public addNewMember(
        company_id : string, token : string,
        memberData : IAddMemberUser) : Promise<Object> {
            return new Promise(
                function(resolve : (value : Response) => void,
                        reject : (error : Object) => void) : void {
                request
                    .post
                    ("/api/companies/" + company_id + "/users")
                    .set("Accept", "application/json")
                    .set("x-access-token", token)
                    .send(memberData)
                    .end(function(error : Object, result : Response) : void {
                        if (result) {
                            if (result.error) {
                                reject(error);
                            } else {
                                resolve(result.body);
                            }
                        }
                });
            });
    }

    public addCompany(user : IAddCompanyUser,
               company : IAddCompanyName,
               token : string) : Promise<Object> {
        console.log("company API");
        console.log(user.email);
        console.log(company.name);
        return new Promise(
            function(resolve : (value : Response ) => void,
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
                        /*resolve(addCompanyResponse);*/
                    }
                });
        })
    }
}

let companyAPIs : CompanyAPIs = new CompanyAPIs();
export default companyAPIs;

