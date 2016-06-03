import SessionApis from "../utils/sessionAPI";
import {Action, Dispatcher} from "../dispatcher/dispatcher";
import {EnterHook} from "react-router";


export interface ILogin {
    email : string;
    password : string;
}

export interface ILoginResponse {
    done : boolean;
    message : string;
    token : string;
    user_id : string;
    email : string;
    status : string;
    error : string;
}

export let DispatcherLogin : Dispatcher<Action<ILoginResponse>> =
    new Dispatcher<Action<ILoginResponse>>();

export let DispatcherLogout : Dispatcher<Action<string>> =
    new Dispatcher<Action<string>>();

class SessionActionCreators {

    public login( login : ILogin) : void {
        SessionApis
            .login(login.email, login.password)
            .then(function(data : ILoginResponse) : void {
                DispatcherLogin.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : Object) : void {
                DispatcherLogin.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
    }

    public logout() : void {
        DispatcherLogout.dispatch({
            actionData : "",
            actionError : undefined
        });
    }

}

let sessionActionCreators : SessionActionCreators = new SessionActionCreators();
export default sessionActionCreators;
