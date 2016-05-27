import companyAPIs from "../utils/companyAPI";
import {Dispatcher} from "../dispatcher/dispatcher";
import Constants from "../constants/constants"

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

export let DispatcherCompaniesData : Dispatcher<ICompany[]> =
    new Dispatcher<ICompany[]>();

export let DispatcherCompaniesMembers : Dispatcher<IMember[]> =
    new Dispatcher<IMember[]>();
    
export let DispatcherAddCompany : Dispatcher<IAddCompany> =
    new Dispatcher<IAddCompany>(); 



class CompanyActionCreator {
    getCompaniesData() : void {
        let token : string = "";
        companyAPIs
            .getCompaniesData(token)
            .then(function (data : ICompany[]) {
                DispatcherCompaniesData.dispatch({
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
                data : data,
                errors : undefined
            })
        })
        } 
     
     addMember(company_id : string, token : string, userData) : void {
        companyAPIs.addNewMember(company_id, token, userData).then(
            function(data) {
                ({
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
            function(data : IAddCompany) {
                alert("Company aggiunta");
                DispatcherAddCompany.dispatch({
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
