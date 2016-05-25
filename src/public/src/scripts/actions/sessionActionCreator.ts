import SessionApis from "../utils/sessionAPI.ts";
import {Dispatcher} from "../dispatcher/dispatcher.ts";
import Constants from "../constants/constants.ts"
import {EnterHook} from "react-router";


export interface ILogin {
    email : string;
    password : string;
}

export let DispatcherLogin : Dispatcher<Constants, ILogin> =
    new Dispatcher<Constants, ILogin>();

export let DispatcherLogout : Dispatcher<Constants, string> =
    new Dispatcher<Constants, string>();

class SessionActionCreators {

    login( login : ILogin) : void {
        SessionApis
            .login(login.email, login.password)
            .then(function(data : ILogin) : void {
                DispatcherLogin.dispatch({
                    type: Constants.LOGIN,
                    data: data
                });
            }, function(error) {
                alert(error);
            });
    }

    logout() : void {
        DispatcherLogout.dispatch({
            type: Constants.LOGOUT,
            data: ""
        });
    }

}

let sessionActionCreators : SessionActionCreators = new SessionActionCreators();
export default sessionActionCreators;
