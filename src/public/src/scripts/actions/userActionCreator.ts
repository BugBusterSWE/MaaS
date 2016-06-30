import {EnterHook} from "react-router";
import userAPIs from "../utils/userAPIs";
import Dispatcher, {Action, ActionError} from "../dispatcher/dispatcher";


/**
 * This interface represent the essential data needed for the user registration.
 */
export interface IUserRegistration {
    token : string;
    company_id : string;
    user_id : string;
    password : string;
}

/**
 * This interface represent the user registration response.
 */
export interface IUserRegistrationResponse {
    message : string;
}

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
    message : "";
}

/**
 * <p>This interface represent the essential data needed
 * for update user email.</p>
 */
export interface IUpdateUserEmail {
    _id : string;
    email : string;
    level : string;
    company_id : string;
    token : string;
}

/**
 * <p>This interface represent the update email response.</p>
 */
export interface IUpdateUserEmailResponse {
    message : "";
}

/**
 * <p>This interface represent the essential data needed
 * for update user password.</p>
 */
export interface IUpdateUserPassword {
    _id : string;
    email : string;
    level : string;
    company_id : string;
    token : string;
}

/**
 * <p>This interface represent the update password response.</p>
 */
export interface IUpdateUserPasswordResponse {
    message : "";
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


export let DispatcherUserRegistration :
    Dispatcher<Action<IUserRegistrationResponse>> =
    new Dispatcher<Action<IUserRegistrationResponse>>();

export let DispatcherSuperAdminCreation :
    Dispatcher<Action<ISuperAdminCreationResponse>> =
    new Dispatcher<Action<ISuperAdminCreationResponse>>();

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
            .then(function(data : IUserRegistrationResponse) : void {
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
     * @description Dispatch the action of register new user.
     * @param data {IUserRegistration}
     */
    public userRegistration( data : IUserRegistration) : void {
        userAPIs
            .userRegistration(data)
            .then(function(data : IUserRegistrationResponse) : void {
                DispatcherUserRegistration.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherUserRegistration.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
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
     * @param data {IRemoveProfileResponse}
     */
    public updateUserEmail( data : IUpdateUserEmail) : void {
        userAPIs
            .updateUserEmail(data)
            .then(function(data : IUpdateUserEmailResponse) : void {
                DispatcherUpdateEmail.dispatch({
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
            .then(function(data : IUpdateUserPasswordResponse) : void {
                DispatcherUpdatePassword.dispatch({
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