import {EnterHook} from "react-router";
import userAPIs from "../utils/userAPIs";
import Dispatcher, {Action, ActionError} from "../dispatcher/dispatcher";
import {DispatcherUpdate, IUpdate} from "./sessionActionCreator";



/**
 * <p>This interface represent the essential data needed
 * for remove profile operation.</p>
 */
export interface IRemoveProfile {
    token : string;
    company_id : string;
    user_id : string;
}

/**
 * <p>This interface represent the remove profile response.</p>
 */
export interface IRemoveProfileResponse {
    message : string;
}

/**
 * <p>This interface represent the essential data needed
 * for update user email.</p>
 */
export interface IUpdateUserEmail {
    _id : string;
    email : string;
    company_id : string;
    token : string;
}

/**
 * <p>This interface represent the update email response.</p>
 */
export interface IUpdateUserEmailResponse {
    email : string;
    message : string;
}

/**
 * <p>This interface represent the essential data needed
 * for update user password.</p>
 */
export interface IUpdateUserPassword {
    _id : string;
    password : string;
    company_id : string;
    token : string;
}

/**
 * <p>This interface represent the update password response.</p>
 */
export interface IUpdateUserPasswordResponse {
    message : string;
}

/**
 * <p>This interface represent the super admin data.</p>
 */
export interface ISuperAdmin {
    email : string;
}

/**
 * <p>This interface represent the essential data needed for the Super Admin
 * registration. </p>
 */
export interface ISupeAdminCreation {
    email : string;
    password : string;
}


/**
 * This interface represent the Super Admin registration response.
 */
export interface ISuperAdminCreationResponse {
    message : string;
}


export let DispatcherSuperAdminCreation :
    Dispatcher<Action<ISuperAdminCreationResponse>> =
    new Dispatcher<Action<ISuperAdminCreationResponse>>();

export let DispatcherSuperAdminData : Dispatcher<Action<ISuperAdmin[]>> =
    new Dispatcher<Action<ISuperAdmin[]>>();

export let DispatcherRemoveProfile :
    Dispatcher<Action<IRemoveProfileResponse>> =
    new Dispatcher<Action<IRemoveProfileResponse>>();

export let DispatcherUpdateEmail :
    Dispatcher<Action<IUpdateUserEmailResponse>> =
    new Dispatcher<Action<IUpdateUserEmailResponse>>();

export let DispatcherUpdatePassword :
    Dispatcher<Action<IUpdateUserPasswordResponse>> =
    new Dispatcher<Action<IUpdateUserPasswordResponse>>();
/**
 * This class represents the creator of the action of the user.
 *
 * @history
 * | Author           | Action Performed               | Data       |
 * |------------------|--------------------------------|------------|
 * | Davide Rigoni    | Create interfaces and class    | 06/06/2016 |
 *
 * @author  Davide Rigoni
 * @license MIT
 *
 */
class UserActionCreators {

    /**
     * @description Dispatch the action of create a new super admin.
     * @param data {IUserRegistration}
     */
    public addSuperAdmin( data : ISupeAdminCreation, token : string) : void {
        userAPIs
            .superAdminCreation(data, token)
            .then(function(data : ISuperAdminCreationResponse) : void {
                DispatcherSuperAdminCreation.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherSuperAdminCreation.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
    }

    /**
     * @description Dispatch the action to geta list of all Super Admins.
     * @param token {string} The token string.
     */
    public getSuperAdmins(token : string) : void {
        userAPIs
            .superAdminList(token)
            .then(function (data : ISuperAdmin[]) : void {
                DispatcherSuperAdminData.dispatch({
                    actionData : data,
                    actionError : undefined
                })
            })
    }


    /**
     * @description Dispatch the action remove profile operations.
     * @param data {IRemoveProfile}
     */
    public removeProfile( data : IRemoveProfile) : void {
        userAPIs
            .removeProfile(data)
            .then(function(data : IRemoveProfileResponse) : void {
                DispatcherRemoveProfile.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherRemoveProfile.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
    }


    /**
     * @description Dispatch the action of update email operations.
     * @param data {IUpdateUserEmail}
     */
    public updateUserEmail( data : IUpdateUserEmail) : void {
        userAPIs
            .updateUserEmail(data)
            .then(function(data : IUpdate) : void {
                DispatcherUpdate.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherUpdateEmail.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
    }

    /**
     * @description Dispatch the action of update password operations.
     * @param data {IUpdateUserPassword}
     */
    public updateUserPassword( data : IUpdateUserPassword) : void {
        userAPIs
            .updateUserPassword(data)
            .then(function(data : IUpdate) : void {
                DispatcherUpdate.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherUpdatePassword.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
    }

}

let userActionCreators : UserActionCreators = new UserActionCreators();
export default userActionCreators;
