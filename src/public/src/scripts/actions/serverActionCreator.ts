import {Dispatcher} from "../dispatcher/dispatcher";
import {ILoginResponse} from "./sessionActionCreator";
import Constants from "../constants/constants"

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
