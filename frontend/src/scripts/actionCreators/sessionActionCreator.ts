import SessionApis from "../utils/sessionAPI.ts";
import Dispatcher from "../dispatcher/dispatcher.ts";
import Constants from "../constants/myConstants.ts"

class SessionActionCreators{

    signup(email : string, password : string, passwordConfirmation : boolean) : void{
        Dispatcher.handleViewAction({
            type: Constants.LOGIN,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
        });
        SessionApis.signup(email, password, passwordConfirmation);
    }

    login(email : string, password : string) : void{
        Dispatcher.handleViewAction({
            type: Constants.LOGOUT,
            email: email,
            password: password
        });
        SessionApis.login(email, password);
    }

    logout() : void{
        Dispatcher.handleViewAction({
            type: Constants.LOGOUT
        });
    }

}

let sessionActionCreators :
    SessionActionCreators = new SessionActionCreators();

export default sessionActionCreators;