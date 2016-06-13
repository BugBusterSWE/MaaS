import {EnterHook} from "react-router";
import userAPIs from "../utils/sessionAPIs";
import Dispatcher, {Action, ActionError} from "../dispatcher/dispatcher";


/**
 * This interface represent the essential data needed for the user registration.
 */
export interface IUserRegistration {
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


export let DispatcherLogin : Dispatcher<Action<IUserRegistrationResponse>> =
    new Dispatcher<Action<IUserRegistrationResponse>>();

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
     * @description Dispatch the action of login of the user.
     * @param login {ILogin} The login params (email, password).
     */
    public userRegistration( data : IUserRegistration) : void {
        userAPIs
            .userRegistration(data)
            .then(function(data : IUserRegistrationResponse) : void {
                DispatcherLogin.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherLogin.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
    }

}

let userActionCreators : UserActionCreators = new UserActionCreators();
export default userActionCreators;
