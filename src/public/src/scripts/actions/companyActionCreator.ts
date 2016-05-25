// I import {companyAPIs} from "../utils/companyAPI.ts";
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

export let DispatcherCompaniesData : Dispatcher<Constants, Array<ICompany>> =
    new Dispatcher<Constants, Array<ICompany>>();

export let DispatcherCompaniesMembers : Dispatcher<Constants, IMember> =
    new Dispatcher<Constants, IMember>();


class CompanyActionCreator {
    getCompaniesData() : void {
        let token : string = "";
        /*companyAPIs.getCompaniesData(token).then(function (dati) {
         DispatcherCompaniesData.dispatch({
         actionType : Constants.COMPANIES_DATA,
         data : dati
         })
         })*/
    }

    /* getCompaniesMembers() : void {
     // FIXME: to remove this
     let company_id = '';
     let token = '';
     companyAPIs.getCompaniesMembers(company_id, token).then(function (dati)
     {
     Dispatcher.handleServerAction({
     actionType : Constants.COMPANIES_MEMBERS,
     data : dati
     })
     })
     }

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

     addCompany(user, company) : void {
     companyAPIs.addCompany(user, company).then(
     function(data) {
     alert("Company aggiunta");
     Dispatcher.handleServerAction({
     actionType: Constants.COMPANIES_DATA,
     data : data.company
     });
     Dispatcher.handleServerAction({
     actionType: Constants.COMPANIES_MEMBERS,
     data : data.user
     });
     }, function (error) {
     alert(error);
     });
     }*/
}

let companyActionCreator : CompanyActionCreator = new CompanyActionCreator();
export default companyActionCreator;
