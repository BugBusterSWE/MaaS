///<reference path='../../../typings/flux/flux.d.ts'/>

import * as flux from "flux";
import Actions from "../actionCreators/collectionActionCreator.ts";
import Constants from "../constants/myConstants.ts";

class MyDispatcher extends flux.Dispatcher<Actions> {

    handleServerAction(action) : void {

        let payload : Object = {
            source: Constants.SERVER_ACTION,
            action: action
        };

        this.dispatch(payload);

    }

    handleViewAction(action) : void {

        let payload : Object = {
            source: Constants.VIEW_ACTION,
            action: action
        };

        this.dispatch(payload);

    }
}

let dispatcher : MyDispatcher = new MyDispatcher();

export default dispatcher;
