import {companyAPIs} from "../utils/companyAPI.ts";
import Dispatcher from "../dispatcher/dispatcher.ts";
import Constants from "../constants/myConstants.ts"

class CompanyActionCreator {

    getCompaniesData() : void {
        let token = '';
        companyAPIs.getCompaniesData(token).then(function (dati) {
            Dispatcher.handleServerAction({
                actionType : Constants.COMPANIES_DATA,
                data : dati
            })
        })
    }

    getCompaniesMembers() : void {
        // FIXME: to remove this
        let company_id = '';
        let token = '';
        companyAPIs.getCompaniesMembers(company_id, token).then(function (dati) {
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
    }
}



export let companyActionCreator = new CompanyActionCreator();
