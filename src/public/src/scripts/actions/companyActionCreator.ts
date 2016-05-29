import companyAPIs from "../utils/companyAPI";
import {Action, Dispatcher} from "../dispatcher/dispatcher";

export interface ICompany {
    name : string;
    id : string;
}

export interface IMember {
    email : string;
    level : string;
}

export interface IAddCompany {
    company : ICompany;
    user : IMember;
}

export interface IAddMember {
    companyId : string;
    token : string;
    userData : Object;
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

    getCompaniesMembers() : void {
        // Occorre passare questi parametri dal componente
        // React che genera l'azione
        let company_id : string = "";
        let token : string = "";
        companyAPIs.getCompaniesMembers(company_id, token)
            .then(function (data : IMember[]) : void {
            DispatcherCompaniesMembers.dispatch({
                data : data,
                errors : undefined
            })
        })
        }

     addMember(company_id : string, token : string, userData : Object) : void {
        companyAPIs.addNewMember(company_id, token, userData).then(
            function(data : IAddMember) : void {
                DispatcherAddMember.dispatch({
                    data : data,
                    errors : undefined
                });
                alert("Membro aggiunto");
                }, function (error) : void {
                    alert(error);
            }
        )
     }

     addCompany(user : IMember, company : ICompany) : void {
        companyAPIs.addCompany(user, company).then(
            function(data : IAddCompany) : void {
                alert("Company aggiunta");
                DispatcherAddCompany.dispatch({
                    data : data,
                    errors : undefined
                });
            }, function (error) : void {
            alert(error);
        });
     }
}

let companyActionCreator : CompanyActionCreator = new CompanyActionCreator();
export default companyActionCreator;
