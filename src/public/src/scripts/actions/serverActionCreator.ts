import {Action, Dispatcher} from "../dispatcher/dispatcher";
import {ILoginResponse} from "./sessionActionCreator";

export let DispatcherRLogin : Dispatcher<Action<ILoginResponse>> =
    new Dispatcher<Action<ILoginResponse>>();

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
