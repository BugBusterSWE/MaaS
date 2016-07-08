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

/**
 * This class represents the creator the generic dispatcher of MaaS.
 *
 * @history
 * | Author           | Action Performed                    | Data       |
 * |------------------|-------------------------------------|------------|
 * | Davide Rigoni    | Create interfaces                   | 20/05/2016 |
 * | Emanuele Carraro | Create CompanyActionCreator class   | 20/05/2016 |
 *
 * @author Emanuele Carraro
 * @author Davide Rigoni
 * @license MIT
 *
 */
export default class Dispatcher<Action> extends flux.Dispatcher<Action> {}
