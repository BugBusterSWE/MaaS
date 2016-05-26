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

export let DispatcherLogin : Dispatcher<Constants, ILoginResponse> =
    new Dispatcher<Constants, ILoginResponse>();

export let DispatcherLogout : Dispatcher<Constants, string> =
    new Dispatcher<Constants, string>();

class SessionActionCreators {

    login( login : ILogin) : void {
        SessionApis
            .login(login.email, login.password)
            .then(function(data : ILoginResponse) : void {
                DispatcherLogin.dispatch({
                    type : Constants.LOGIN,
                    data : data,
                    errors : undefined
                });
            }, function(error) {
                alert(error);
            });
    }

    logout() : void {
        DispatcherLogout.dispatch({
            type : Constants.LOGOUT,
            data : "",
            errors : undefined
        });
    }

}

let sessionActionCreators : SessionActionCreators = new SessionActionCreators();
export default sessionActionCreators;
