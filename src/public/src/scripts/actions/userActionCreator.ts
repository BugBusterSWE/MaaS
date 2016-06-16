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

export let DispatcherUserRegistration :
    Dispatcher<Action<IUserRegistrationResponse>> =
    new Dispatcher<Action<IUserRegistrationResponse>>();

export let DispatcherRemoveProfile :
    Dispatcher<Action<IRemoveProfileResponse>> =
    new Dispatcher<Action<IRemoveProfileResponse>>();

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
     * @description Dispatch the action of create a new Super Admin
     * @param login {ILogin} The login params (email, password).
     */
    public addSuperAdmin( data : IUserRegistration) : void {
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
     * @description Dispatch the action of login of the user.
     * @param login {ILogin} The login params (email, password).
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
     * @description Dispatch the action of login of the user.
     * @param login {ILogin} The login params (email, password).
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

}

let userActionCreators : UserActionCreators = new UserActionCreators();
export default userActionCreators;
