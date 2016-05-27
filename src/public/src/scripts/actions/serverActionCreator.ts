import {Dispatcher} from "../dispatcher/dispatcher.ts";
import {ILoginResponse} from "./sessionActionCreator.ts";
import Constants from "../constants/constants.ts"

export let DispatcherRLogin : Dispatcher<ILoginResponse> =
    new Dispatcher<ILoginResponse>();

class ServerActionCreator {

    receiveLogin(data : ILoginResponse) : void {
        DispatcherRLogin.dispatch({
            data : data,
            errors : undefined
        });
    }

}

let serverActionCreator : ServerActionCreator = new ServerActionCreator();
export default serverActionCreator;
