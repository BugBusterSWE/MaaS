import * as flux from "flux";


export interface Action <dataType>{
    data : dataType;
    error : string;
}

export class Dispatcher<Action> extends flux.Dispatcher<Action> {

}
