import {Dispatcher} from "../dispatcher/dispatcher.ts";
import {ILogin} from "./sessionActionCreator.ts";
import Constants from "../constants/constants.ts"

export interface IRLogin {
    json : Object;
    errors : string;
}

export let DispatcherRLogin : Dispatcher<Constants, IRLogin> =
    new Dispatcher<Constants, IRLogin>();

class ServerActionCreator {

    receiveLogin(data : IRLogin) : void {
        DispatcherRLogin.dispatch({
            type: Constants.LOGIN,
            data: data
        });
    }

}

let serverActionCreator : ServerActionCreator = new ServerActionCreator();
export default serverActionCreator;
