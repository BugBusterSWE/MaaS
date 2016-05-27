import SessionApis from "../utils/sessionAPI.ts";
import {Dispatcher} from "../dispatcher/dispatcher.ts";
import Constants from "../constants/constants.ts"
import {EnterHook} from "react-router";


export interface ILogin {
    email : string;
    password : string;
}

export interface ILoginResponse {
    email : string;
    user_id : number;
    token : Object;
}

export let DispatcherLogin : Dispatcher<ILoginResponse> =
    new Dispatcher<ILoginResponse>();

export let DispatcherLogout : Dispatcher<string> =
    new Dispatcher<string>();

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
