import Dispatcher from "../dispatcher/dispatcher.ts";
import Constants from "../constants/myConstants.ts"

class ServerActionCreator{
    
    receiveSignup(json: Object, errors: string) : void {
        Dispatcher.handleServerAction({
            type: Constants.SIGNUP,
            json: json,
            errors: errors
        });
    }

    receiveLogin(json: Object, errors: string) : void {
        Dispatcher.handleServerAction({
            type: Constants.LOGIN,
            json: json,
            errors: errors
        });
    }

}

let serverActionCreator : ServerActionCreator = new ServerActionCreator();

export default serverActionCreator;
