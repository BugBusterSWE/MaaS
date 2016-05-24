import * as flux from "flux";
import Constants from "../constants/myConstants.ts";
import Action from "./action.ts"

interface Payload {
    source : string;
    action : Action;
}

class MyDispatcher extends flux.Dispatcher<Payload> {

    public handleServerAction(action : Action) : void {

        let payload : Payload = {
            source: Constants.SERVER_ACTION,
            action: action
        };

        this.dispatch(payload);

    }

    public handleViewAction(action : Action) : void {

        let payload : Payload = {
            source: Constants.VIEW_ACTION,
            action: action
        };

        this.dispatch(payload);

    }
}

let dispatcher : MyDispatcher = new MyDispatcher();

export default dispatcher;
