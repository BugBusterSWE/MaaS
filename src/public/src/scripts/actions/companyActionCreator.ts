import companyAPIs from "../utils/companyAPIs";
import Dispatcher, {Action, ActionError} from "../dispatcher/dispatcher";

/**
 * This interface represents
 */
export interface ICompany {
    name : string;
    owner : string;
    _id : string;
}

/**
 * This interface represents
 */
export interface IUser {
    _id : string;
    email : string;
}

/**
 * This interface represents
 */
export interface IMemberInfo {
    company : string;
    level : string;
}

export interface IMember extends IUser, IMemberInfo {}

/**
 * This interface represents
 */
export interface IAddMemberUser extends IMemberInfo {
    email : string;
    password : string;
}

/**
 * This interface represents
 */
export interface IAddCompanyUserResponse extends IUser {
    __v : string;
    level : string;
}

/**
 * This interface represents
 */
export interface ICompanyResponse extends ICompany {
    __v : string;
}

/**
 * This interface represents
 */
export interface IAddCompanyResponse {
    user : IAddCompanyUserResponse;
    company : ICompanyResponse;
}

/**
 * This interface represents
 */
export interface IAddCompanyUser {
    email : string;
    password : string;
}

/**
 * This interface represents
 */
export interface IAddCompanyName {
    name : string;
}

/**
 * This interface represents
 */
export interface IAddMemberResponse extends IUser, IMemberInfo {
    __v : string;
}

export let DispatcherCompaniesData : Dispatcher<Action<ICompany[]>> =
    new Dispatcher<Action<ICompany[]>>();

export let DispatcherCompaniesMembers : Dispatcher<Action<IMember[]>> =
    new Dispatcher<Action<IMember[]>>();

export let DispatcherAddCompany : Dispatcher<Action<IAddCompanyResponse>> =
    new Dispatcher<Action<IAddCompanyResponse>>();

export let DispatcherAddMember : Dispatcher<Action<IAddMemberResponse>> =
    new Dispatcher<Action<IAddMemberResponse>>();


/**
 * This class represents the creator of the action of the company.
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
class CompanyActionCreator {

    /**
     * @description Dispatch the action to get the data of the companies.
     * @param token {string} The token string.
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
