import companyAPIs from "../utils/companyAPI.ts";
import {Dispatcher} from "../dispatcher/dispatcher.ts";
import Constants from "../constants/constants.ts"

export interface ICompany {
    name : string;
    id : string;
}

export interface IMember {
    username : string;
    level : string;
}

export interface IAddCompany {
    company : ICompany;
    user : IMember;
}

export let DispatcherCompaniesData : Dispatcher<Constants, ICompany[]> =
    new Dispatcher<Constants, ICompany[]>();

export let DispatcherCompaniesMembers : Dispatcher<Constants, IMember[]> =
    new Dispatcher<Constants, IMember[]>();
    
export let DispatcherAddCompany : Dispatcher<Constants, IAddCompany> =
    new Dispatcher<Constants, IAddCompany>(); 


class CompanyActionCreator {
    getCompaniesData() : void {
        let token : string = "";
        companyAPIs
            .getCompaniesData(token)
            .then(function (data : ICompany[]) {
                DispatcherCompaniesData.dispatch({
                    type : Constants.COMPANIES_DATA, 
                    data : data,
                    errors : undefined
                })
             })
    }

    getCompaniesMembers() : void {
        // occorre passare questi parametri dal componente React che genera l'azione
        let company_id = '';
        let token = '';
        companyAPIs.getCompaniesMembers(company_id, token).then(function (data : IMember[])
        {
            DispatcherCompaniesMembers.dispatch({
                type : Constants.COMPANY_MEMBERS,
                data : data,
                errors : undefined
            })
        })
        } 
     
     /*
     addMember(company_id, userData) : void {
     companyAPIs.addNewMember(company_id, userData).then(
     function(data) {
     Dispatcher.handleServerAction({
     actionType : Constants.COMPANIES_MEMBERS_ADD,
     data : data
     });
     alert("Membro aggiunto");
     }, function (error) {
     alert(error);
     }
     )
     }
     */
    
     addCompany(user, company) : void {
        companyAPIs.addCompany(user, company).then(
            function(data : IAddCompany) {
                alert("Company aggiunta");
                DispatcherAddCompany.dispatch({
                    type : Constants.COMPANY_ADD,
                    data : data,
                    errors : undefined
                });
            }, function (error) {
            alert(error);
        });
     }
}

let companyActionCreator : CompanyActionCreator = new CompanyActionCreator();
export default companyActionCreator;
