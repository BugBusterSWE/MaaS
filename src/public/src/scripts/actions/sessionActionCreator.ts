import SessionApis from "../utils/sessionAPI";
import {Action, Dispatcher} from "../dispatcher/dispatcher";
import {EnterHook} from "react-router";


export interface ILogin {
    email : string;
    password : string;
}

export interface ILoginResponse {
    email : string;
    user_id : string;
    token : string;
}

export let DispatcherLogin : Dispatcher<Action<ILoginResponse>> =
    new Dispatcher<Action<ILoginResponse>>();

export let DispatcherLogout : Dispatcher<Action<string>> =
    new Dispatcher<Action<string>>();

class SessionActionCreators {

    login( login : ILogin) : void {
        SessionApis
            .login(login.email, login.password)
            .then(function(data : ILoginResponse) : void {
                DispatcherLogin.dispatch({
                    data : data,
                    errors : undefined
                });
            }, function(error) {
                alert(error);
            });
    }

    logout() : void {
        DispatcherLogout.dispatch({
            data : "",
            errors : undefined
        });
    }

}

let sessionActionCreators : SessionActionCreators = new SessionActionCreators();
export default sessionActionCreators;
