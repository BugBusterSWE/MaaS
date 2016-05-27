import * as flux from "flux";
import Constants from "../constants/constants.ts";


export interface Action <dataType>{
    data : dataType;
    errors : string;
}

export class Dispatcher<dataType> extends
    flux.Dispatcher<Action <dataType>> {
}
