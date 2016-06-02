import companyAPIs from "../utils/companyAPI";
import {Action, Dispatcher} from "../dispatcher/dispatcher";

export interface ICompany {
    name : string;
    owner : string;
    _id : string;
}

export interface IMember {
    email : string;
    level : string;
}

export interface IUser {
    email : string;
    password : string;
    level : string;
    company : string;
}

export interface IAddMember {
    companyId : string;
    token : string;
    userData : IUser;
}

export interface IAddCompanyUser {
    email : string;
    password : string;
}

export interface IAddCompanyName {
    name : string;
}

export interface IAddCompany {
    user : IAddCompanyUser;
    company : IAddCompanyName;
    id : string;
}

export let DispatcherCompaniesData : Dispatcher<Action<ICompany[]>> =
    new Dispatcher<Action<ICompany[]>>();

export let DispatcherCompaniesMembers : Dispatcher<Action<IMember[]>> =
    new Dispatcher<Action<IMember[]>>();

export let DispatcherAddCompany : Dispatcher<Action<IAddCompany>> =
    new Dispatcher<Action<IAddCompany>>();

export let DispatcherAddMember : Dispatcher<Action<IAddMember>> =
    new Dispatcher<Action<IAddMember>>();

class CompanyActionCreator {

    getCompaniesData() : void {
        let token : string = "";
        companyAPIs
            .getCompaniesData(token)
            .then(function (data : ICompany[]) : void {
                DispatcherCompaniesData.dispatch({
                    data : data,
                    errors : undefined
                })
             })
    }

    getCompaniesMembers(company_id : string) : void {
        // Occorre passare questi parametri dal componente
        // React che genera l'azione
        let token : string = "";
        companyAPIs.getCompaniesMembers(company_id, token)
            .then(function (data : IMember[]) : void {
            DispatcherCompaniesMembers.dispatch({
                data : data,
                errors : undefined
            })
        })
        }

     addMember(company_id : string, token : string, userData : IUser) : void {
        companyAPIs.addNewMember(company_id, token, userData).then(
            function(data : IAddMember) : void {
                DispatcherAddMember.dispatch({
                    data : data,
                    errors : undefined
                });
                alert("Membro aggiunto");
                }, function (error : Object) : void {
                    alert(error);
            }
        )
     }

     addCompany(user : IAddCompanyUser,
                company : IAddCompanyName) : void {
        console.log("CompanyActionCreator");
        console.log(company.name);
        companyAPIs.addCompany(user, company).then(
            function(data : IAddCompany) : void {
                alert("Company aggiunta");
                DispatcherAddCompany.dispatch({
                    data : data,
                    errors : undefined
                });
            }, function (error : Object) : void {
        console.log(JSON.stringify(error));
        });
     }
}

let companyActionCreator : CompanyActionCreator = new CompanyActionCreator();
export default companyActionCreator;
