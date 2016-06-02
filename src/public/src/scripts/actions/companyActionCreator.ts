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

    public getCompaniesData() : void {
        let token : string = "";
        companyAPIs
            .getCompaniesData(token)
            .then(function (data : ICompany[]) : void {
                DispatcherCompaniesData.dispatch({
                    actionData : data,
                    actionError : undefined
                })
             })
    }

    public getCompaniesMembers() : void {
        // Occorre passare questi parametri dal componente
        // React che genera l'azione
        let company_id : string = "";
        let token : string = "";
        companyAPIs.getCompaniesMembers(company_id, token)
            .then(function (data : IMember[]) : void {
            DispatcherCompaniesMembers.dispatch({
                actionData : data,
                actionError : undefined
            })
        })
        }

    public addMember(company_id : string, token : string,
                     userData : IUser) : void {
        companyAPIs.addNewMember(company_id, token, userData).then(
            function(data : IAddMember) : void {
                DispatcherAddMember.dispatch({
                    actionData : data,
                    actionError : undefined
                });
                alert("Membro aggiunto");
                }, function (error : Object) : void {
                    alert(error);
            }
        )
     }

    public addCompany(user : IAddCompanyUser,
                company : IAddCompanyName,
                id : string) : void {
        console.log("CompanyActionCreator");
        console.log(company.name);
        companyAPIs.addCompany(user, company).then(
            function(data : IAddCompany) : void {
                alert("Company aggiunta");
                DispatcherAddCompany.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function (error : Object) : void {
        console.log(JSON.stringify(error));
        });
     }
}

let companyActionCreator : CompanyActionCreator = new CompanyActionCreator();
export default companyActionCreator;
