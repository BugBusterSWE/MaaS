import * as flux from "flux";

/**
 * This interface represents the generic action.
 */
export interface Action <dataType>{
    actionData : dataType;
    actionError : ActionError;
}

/**
 * This interface represents the error data of the {Action<dataType>}
 */
export interface ActionError {
    code : string,
    message : string
}

export class Dispatcher<Action> extends flux.Dispatcher<Action> {}
