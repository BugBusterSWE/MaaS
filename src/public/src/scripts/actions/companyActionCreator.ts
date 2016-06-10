import companyAPIs from "../utils/companyAPI";
import {Action, Dispatcher, ActionError} from "../dispatcher/dispatcher";

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

export interface ICompany {
    name : string;
    owner : string;
    _id : string;
}

export interface IUser {
    _id : string;
    email : string;
}

export interface IMemberInfo {
    company : string;
    level : string;
}

export interface IMember extends IUser, IMemberInfo {}

export interface IAddMemberUser extends IMemberInfo {
    email : string;
    password : string;
}

export interface IAddCompanyUserResponse extends IUser {
    __v : string;
    level : string;
}

export interface ICompanyResponse extends ICompany {
    __v : string;
}

export interface IAddCompanyResponse {
    user : IAddCompanyUserResponse;
    company : ICompanyResponse;
}

export interface IAddCompanyUser {
    email : string;
    password : string;
}

export interface IAddCompanyName {
    name : string;
}

export interface IAddMemberResponse extends IUser, IMemberInfo {
    __v : string;
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
export let DispatcherAddCompany : Dispatcher<Action<IAddCompanyResponse>> =
    new Dispatcher<Action<IAddCompanyResponse>>();

/**
 * @description <p>The DispatcherAddMember object
 * to export as a singleton. It is used to dispatch the Action
 * addMember. </p>
 *
 */
export let DispatcherAddMember : Dispatcher<Action<IAddMemberResponse>> =
    new Dispatcher<Action<IAddMemberResponse>>();

class CompanyActionCreator {

    /**
     * @description Dispatch the action to get the data of the companies.
     * @param token {string} The token string.
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
     * @param token {string} The token string.
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
                     userData : IAddMemberUser) : void {
        companyAPIs.addNewMember(company_id, token, userData)
            .then(function(data : IAddMemberResponse) : void {
                alert("Membro aggiunto");
                DispatcherAddMember.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherAddMember.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
     }

    /**
     * @description Dispatch the action to add a company.
     * @param user {IAddCompanyUser} The owner of the company.
     * @param company {IAddCompanyName} The company name.
     * @param token {string} The token string.
     * @returns {void}
     */
    public addCompany(user : IAddCompanyUser,
                      company : IAddCompanyName,
                      token : string) : void {
        console.log("CompanyActionCreator");
        console.log(company.name);
        companyAPIs.addCompany(user, company, token).then(
            function(data : IAddCompanyResponse) : void {
                alert("Company aggiunta");
                DispatcherAddCompany.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function (error : ActionError) : void {
                DispatcherAddCompany.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            })
     }
}

let companyActionCreator : CompanyActionCreator = new CompanyActionCreator();
export default companyActionCreator;
