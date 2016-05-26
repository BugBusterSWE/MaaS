import * as flux from "flux";
import Constants from "../constants/constants.ts";


export interface Action <Type extends Constants, dataType>{
    type : Type;
    data : dataType;
    errors : string;
}

export class Dispatcher<Type extends Constants, dataType> extends
    flux.Dispatcher<Action<Type, dataType>> {
}
