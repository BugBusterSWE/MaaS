import companyAPIs from "../utils/companyAPI";
import {Action, Dispatcher} from "../dispatcher/dispatcher";

/**
 *
 * @history
 * | Author           | Action Performed                    | Data       |
 * |------------------|-------------------------------------|------------|
 * | Davide Rigoni    | Create interfaces                   | 20/05/2016 |
 * | Emanuele Carraro | Create CompanyActionCreator class   | 20/05/2016 |
 *
 * @author Emanuele Carraro
 * @author Davide Rigoni
 * @license MIT
 *
 */

/**
 *
 * ICompany defines the type
 * of a company in MaaS.
 *
 */
export interface ICompany {
    name : string;
    owner : string;
    _id : string;
}

/**
 *
 * IMember defines the type
 * of a member in MaaS.
 *
 */
export interface IMember {
    _id : string;
    email : string;
    company : string;
    level : string;
}

/**
 *
 * IUser defines the type
 * of a user in MaaS.
 *
 */
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

/**
 *
 * IAddCompan defines the type
 * of the Action addCompany.
 *
 */
export interface IAddCompany {
    user : IAddCompanyUser;
    company : IAddCompanyName;
    id : string;
}

/**
 *
 * IAddCompanyUser defines the type
 * of user in IAddCompany.
 *
 */
export interface IAddCompanyUser {
    email : string;
    password : string;
}

/**
 *
 * IAddCompanyName defines the type
 * of company in IAddCompany.
 *
 */
export interface IAddCompanyName {
    name : string;
}

/**
 * @description <p>The DispatcherCompaniesData object
 * to export as a singleton. It is used to dispatch the Action
 * getCompaniesData. </p>
 *
 */
export let DispatcherCompaniesData : Dispatcher<Action<ICompany[]>> =
    new Dispatcher<Action<ICompany[]>>();

/**
 * @description <p>The DispatcherCompaniesMembers object
 * to export as a singleton. It is used to dispatch the Action
 * getCompaniesMembers. </p>
 *
 */
export let DispatcherCompaniesMembers : Dispatcher<Action<IMember[]>> =
    new Dispatcher<Action<IMember[]>>();

/**
 * @description <p>The DispatcherAddCompany object
 * to export as a singleton. It is used to dispatch the Action
 * addCompany. </p>
 *
 */
export let DispatcherAddCompany : Dispatcher<Action<IAddCompany>> =
    new Dispatcher<Action<IAddCompany>>();

/**
 * @description <p>The DispatcherAddMember object
 * to export as a singleton. It is used to dispatch the Action
 * addMember. </p>
 *
 */
export let DispatcherAddMember : Dispatcher<Action<IAddMember>> =
    new Dispatcher<Action<IAddMember>>();

class CompanyActionCreator {

    /**
     * @description Dispatch the action to get the data of the companies.
     * @returns {void}
     */
    public getCompaniesData(token : string) : void {
        companyAPIs
            .getCompaniesData(token)
            .then(function (data : ICompany[]) : void {
                DispatcherCompaniesData.dispatch({
                    actionData : data,
                    actionError : undefined
                })
             })
    }


    /**
     * @description Dispatch the action to get the members of the company.
     * @param company_id {string} The id of the company.
     * @returns {void}
     */
    public getCompaniesMembers(company_id : string, token : string) : void {
        companyAPIs.getCompaniesMembers(company_id, token)
            .then(function (data : IMember[]) : void {
            DispatcherCompaniesMembers.dispatch({
                actionData : data,
                actionError : undefined
            })
        })
        }

    /**
     * @description Dispatch the action to add a member to a company.
     * @param company_id {string} The id of the company.
     * @param token {string} The token string.
     * @param userData {IUser} The data of the user.
     * @returns {void}
     */
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

    /**
     * @description Dispatch the action to add a company.
     * @param user {IAddCompanyUser} The owner of the company.
     * @param company {IAddCompanyName} The company name.
     * @returns {void}
     */
    public addCompany(user : IAddCompanyUser,
                      company : IAddCompanyName) : void {
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

/**
 * @description The companyActionCreator object to export as a singleton.
 */
let companyActionCreator : CompanyActionCreator = new CompanyActionCreator();
export default companyActionCreator;
