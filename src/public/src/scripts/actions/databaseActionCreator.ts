import databaseAPIs from "../utils/databaseAPI";
import Dispatcher, {Action, ActionError} from "../dispatcher/dispatcher";
import DatabaseAPIs from "../utils/databaseAPI";

/**
 * This interface represent the database.
 */
export interface IDatabase {
    dbName : string;
    password : string;
    username : string;
    host : string;
    port : number;
}

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
export interface IAddDatabase extends IDatabase {
    id_company : string;
}

/**
 * This interface represents the add database response.
 */
export interface IAddDatabaseResponse {
    message : string;
}

/**
 * This interface represent the essential data needed to find a database.
 */
export interface IFindDatabase {
    id_company : string;
    id_database : string;
}

/**
 * This interface represents the find database response.
 */
export interface IFindDatabaseResponse extends IDatabase {
}

/**
 * This interface represent the essential data needed to get all database.
 */
export interface IGetAllDatabase {
    id_company : string;
}

/**
 * This interface represents the get all database response.
 */
export interface IGetAllDatabaseResponse extends IDatabase {
}

export let DispatcherRemoveDatabase :
    Dispatcher<Action<IRemoveDatabaseResponse>> =
    new Dispatcher<Action<IRemoveDatabaseResponse>>();

export let DispatcherAddDatabase :
    Dispatcher<Action<IAddDatabaseResponse>> =
    new Dispatcher<Action<IAddDatabaseResponse>>();

export let DispatcherFindDatabase :
    Dispatcher<Action<IFindDatabaseResponse>> =
    new Dispatcher<Action<IFindDatabaseResponse>>();

export let DispatcherGetAllDatabase :
    Dispatcher<Action<IGetAllDatabaseResponse[]>> =
    new Dispatcher<Action<IGetAllDatabaseResponse[]>>();

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

    /**
     * @description Dispatch the action of find a database.
     * @param data {IFindDatabase}
     */
    public findDatabase( data : IFindDatabase) : void {
        DatabaseAPIs
            .findDatabase(data)
            .then(function(data : IFindDatabaseResponse) : void {
                DispatcherFindDatabase.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherFindDatabase.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
    }

    /**
     * @description Dispatch the action of get all database.
     * @param data {IFindDatabase}
     */
    public getAllDatabase( data : IGetAllDatabase) : void {
        DatabaseAPIs
            .getAllDatabase(data)
            .then(function(data : IGetAllDatabaseResponse[]) : void {
                DispatcherGetAllDatabase.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherGetAllDatabase.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
    }

}

let databaseActionCreator : DatabaseActionCreator = new DatabaseActionCreator();
export default databaseActionCreator;
