import * as request from "superagent";
import {Response} from "superagent";
import {IMember, ICompany, IUser} from "../actions/companyActionCreator";

class CompanyAPIs {

    getCompaniesData(token : string) : Promise<Object> {

        return new Promise(
            function (resolve : (value : Response) => void,
                      reject : (error : Object) => void) : void
            {
            request
                .get("/api/admin/companies")
                .set("Content-Type', 'application/json")
                // C .set('x-access-token', token)
                .end(function(error : Object, result : Response) : void {
                    console.log(JSON.stringify(result));
                    if (result) {
                        resolve(result.body);
                    } else {
                        reject(error);
                    }
                });
            // Ritorno dei dati per mochup
        });
    }

    getCompaniesMembers(company_id : string, token : string) : Promise<Object> {

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

    addNewMember(
        company_id : string, token : string,
        memberData : IUser) : Promise<Object> {
            return new Promise(
                function(resolve : (value : Response) => void,
                        reject : (error : Object) => void) : void {
                request
                    .post
                    ("/api/companies/'+company_id+'/users")
                    .send(memberData)
                    .set("Accept", "application/json")
                    .set("x-access-token", token)
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

    addCompany(company : ICompany) : Promise<Object> {
        console.log("company API");
        console.log(company.email);
        console.log(company.name);;
        return new Promise(
            function(resolve : (value : Response) => void,
                     reject : (error : Object) => void) : void {
            request
                .post("/api/admin/companies")
                .send({name : company.name, owner : company.email})
                .end(function(error : Object, result : Response) : void {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.body);
                    }
                });
        })
    }
}

let companyAPIs : CompanyAPIs = new CompanyAPIs();
export default companyAPIs;

