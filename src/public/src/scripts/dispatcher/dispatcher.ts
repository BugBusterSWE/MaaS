import * as flux from "flux";


export interface Action <dataType>{
    data : dataType;
    errors : string;
}

export class Dispatcher<Action> extends
    flux.Dispatcher<Action> {
}
