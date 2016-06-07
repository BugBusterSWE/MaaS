import * as flux from "flux";


export interface Action <dataType>{
    actionData : dataType;
    actionError : ActionError;
}

export interface ActionError {
    code : string,
    message : string
}

export class Dispatcher<Action> extends flux.Dispatcher<Action> {}
