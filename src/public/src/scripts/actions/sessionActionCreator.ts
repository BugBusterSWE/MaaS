import SessionApis from "../utils/sessionAPI";
import {Action, Dispatcher, ActionError} from "../dispatcher/dispatcher";
import {EnterHook} from "react-router";


/**
 * This interface represent the essential data needed for the login.
 */
export interface ILogin {
    email : string;
    password : string;
}

/**
 * This interface represents the login response.
 */
export interface ILoginResponse {
    token : string;
    user_id : string;
    email : string;
    level : string;
}

export let DispatcherLogin : Dispatcher<Action<ILoginResponse>> =
    new Dispatcher<Action<ILoginResponse>>();

export let DispatcherLogout : Dispatcher<Action<string>> =
    new Dispatcher<Action<string>>();

/**
 * This class represents the creator of the action of the session.
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
class SessionActionCreators {

    /**
     * @description Dispatch the action to login the user.
     * @param login {ILogin} The login params (email, password).
     * @returns {void}
     */
    public login( login : ILogin) : void {
        SessionApis
            .login(login.email, login.password)
            .then(function(data : ILoginResponse) : void {
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

    /**
     * @description Dispatch the action to logout the user.
     * @returns {void}
     */
    public logout() : void {
        DispatcherLogout.dispatch({
            actionData : "",
            actionError : undefined
        });
    }

}

let sessionActionCreators : SessionActionCreators = new SessionActionCreators();
export default sessionActionCreators;
