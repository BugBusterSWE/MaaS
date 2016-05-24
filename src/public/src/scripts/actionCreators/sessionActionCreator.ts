import SessionApis from "../utils/sessionAPI.ts";
import Dispatcher from "../dispatcher/dispatcher.ts";
import Constants from "../constants/myConstants.ts"
import {EnterHook} from "react-router";

class SessionActionCreators {

    login(email : string, password : string) : void {
        SessionApis
            .login(email, password)
            .then(function(data) {
                Dispatcher.handleServerAction({
                    actionType: Constants.LOGIN,
                    data: data
                });
            }, function(error) {
                alert(error);
            });
    }

    logout() : void {
        Dispatcher.handleViewAction({
            type: Constants.LOGOUT
        });
    }

}

export let sessionActionCreators = new SessionActionCreators();
