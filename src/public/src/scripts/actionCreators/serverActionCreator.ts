import Dispatcher from "../dispatcher/dispatcher.ts";
import Constants from "../constants/myConstants.ts"

class ServerActionCreator {

    receiveLogin(json : Object, errors : string) : void {
        Dispatcher.handleServerAction({
            type: Constants.LOGIN,
            json: json,
            errors: errors
        });
    }

}

let serverActionCreator : ServerActionCreator = new ServerActionCreator();

export default serverActionCreator;
