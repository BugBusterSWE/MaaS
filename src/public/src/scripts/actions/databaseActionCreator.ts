import databaseAPIs from "../utils/databaseAPI";
import Dispatcher, {Action, ActionError} from "../dispatcher/dispatcher";
import DatabaseAPIs from "../utils/databaseAPI";

/**
 * This interface represent the database.
 */
export interface IDatabase {
    _id : string;
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
export interface IAddDatabase {
    dbName : string;
    password : string;
    username : string;
    host : string;
    port : number;
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
 * This interface represent the essential data needed to get all databases.
 */
export interface IGetAllDatabases {
    id_company : string;
    token : string
}


/**
 * This interface represent the essential data needed to update a database.
 */
export interface IUpdateDatabase {
    dbName : string;
    password : string;
    username : string;
    host : string;
    port : number;
    id_company : string;
    id_database : string;
}




export let DispatcherRemoveDatabase :
    Dispatcher<Action<IRemoveDatabaseResponse>> =
    new Dispatcher<Action<IRemoveDatabaseResponse>>();

export let DispatcherAddDatabase :
    Dispatcher<Action<IAddDatabaseResponse>> =
    new Dispatcher<Action<IAddDatabaseResponse>>();

export let DispatcherFindDatabase :
    Dispatcher<Action<IDatabase>> =
    new Dispatcher<Action<IDatabase>>();

export let DispatcherGetAllDatabase :
    Dispatcher<Action<IDatabase[]>> =
    new Dispatcher<Action<IDatabase[]>>();

export let DispatcherUpdateDatabase :
    Dispatcher<Action<IDatabase>> =
    new Dispatcher<Action<IDatabase>>();

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
    public removeDatabase( data : IRemoveDatabase, token : string) : void {
        DatabaseAPIs
            .removeDatabase(data, token)
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
    public addDatabase( data : IAddDatabase, token : string) : void {
        DatabaseAPIs
            .addDatabase(data, token)
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
    public findDatabase( data : IFindDatabase, token : string) : void {
        DatabaseAPIs
            .findDatabase(data, token)
            .then(function(data : IDatabase) : void {
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
     * @description Dispatch the action of get all databases.
     * @param data {IFindDatabase}
     */
    public getAllDatabase( data : IGetAllDatabases) : void {
        DatabaseAPIs
            .getAllDatabases(data)
            .then(function(data : IDatabase[]) : void {
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

    /**
     * @description Dispatch the action of update a database.
     * @param data {IUpdateDatabase}
     */
    public updateDatabase( data : IUpdateDatabase, token : string) : void {
        DatabaseAPIs
            .updateDatabase(data, token)
            .then(function(data : IDatabase) : void {
                DispatcherUpdateDatabase.dispatch({
                    actionData : data,
                    actionError : undefined
                });
            }, function(error : ActionError) : void {
                DispatcherUpdateDatabase.dispatch({
                    actionData : undefined,
                    actionError : error
                });
            });
    }

}

let databaseActionCreator : DatabaseActionCreator = new DatabaseActionCreator();
export default databaseActionCreator;
