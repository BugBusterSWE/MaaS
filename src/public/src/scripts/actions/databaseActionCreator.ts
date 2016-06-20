import databaseAPIs from "../utils/databaseAPI";
import Dispatcher, {Action, ActionError} from "../dispatcher/dispatcher";
import DatabaseAPIs from "../utils/databaseAPI";


/**
 * This interface represent the essential data needed for remove a database.
 */
export interface IRemoveDatabase {
    id_company : string;
    id_database : string;
}

/**
 * This interface represents the remove database response.
 */
export interface IRemoveDatabaseResponse {
    message : string;
}

/**
 * This interface represent the essential data needed for add a database.
 */
export interface IAddDatabase {
    id_company : string;
    id_database : string;
}

/**
 * This interface represents the add database response.
 */
export interface IAddDatabaseResponse {
    message : string;
}

export let DispatcherRemoveDatabase :
    Dispatcher<Action<IRemoveDatabaseResponse>> =
    new Dispatcher<Action<IRemoveDatabaseResponse>>();

export let DispatcherAddDatabase :
    Dispatcher<Action<IAddDatabaseResponse>> =
    new Dispatcher<Action<IAddDatabaseResponse>>();

/**
 * This class represents the creator of the action of the database.
 *
 * @history
 * | Author           | Action Performed                    | Data       |
 * |------------------|-------------------------------------|------------|
 * | Davide Rigoni    | Create class and interfaces         | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 *
 */
class DatabaseActionCreator {

    /**
     * @description Dispatch the action of remove database.
     * @param data {IRemoveDatabase}
     */
    public removeDatabase( data : IRemoveDatabase) : void {
        DatabaseAPIs
            .removeDatabase(data)
            .then(function(data : IRemoveDatabaseResponse) : void {
                DispatcherRemoveDatabase.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherRemoveDatabase.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
    }

    /**
     * @description Dispatch the action of add database.
     * @param data {IAddDatabase}
     */
    public addDatabase( data : IAddDatabase) : void {
        DatabaseAPIs
            .addDatabase(data)
            .then(function(data : IAddDatabaseResponse) : void {
                DispatcherAddDatabase.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherAddDatabase.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
    }

}

let databaseActionCreator : DatabaseActionCreator = new DatabaseActionCreator();
export default databaseActionCreator;
