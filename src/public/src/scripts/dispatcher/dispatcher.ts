import * as flux from "flux";


export interface Action <dataType>{
    actionData : dataType;
    actionError : Object;
}

export class Dispatcher<Action> extends flux.Dispatcher<Action> {}
