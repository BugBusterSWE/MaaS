import {Action, ActionError} from "../dispatcher/dispatcher";
import {EventEmitter} from "events";
import {DispatcherRemoveDatabase, IRemoveDatabaseResponse,
    DispatcherAddDatabase, IAddDatabaseResponse,
    DispatcherFindDatabase, IDatabase,
    DispatcherGetAllDatabase,
    DispatcherUpdateDatabase
} from "../actions/databaseActionCreator";

/**
 * DatabaseStore contains all the logic of database.
 *
 * @history
 * | Author           | Action Performed          | Data       |
 * | ---              | ---                       | ---        |
 * | Davide Rigoni    | Update DatabaseStore      | 06/06/2016 |
 *
 * @author Davide Rigoni
 * @copyright MIT
 */
class DatabaseStore extends EventEmitter {

    /**
     * @description String for events management.
     */
    private static CHANGE_EVENT : string = "change";

    /**
     * @description This data field represents the remove database response.
     * @type {IRemoveDatabaseResponse}
     */
    private _removeDatabaseResponse : IRemoveDatabaseResponse = {
        message : undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs during the
     * remove database query.</p>
     * @type {ActionError}
     */
    private _removeDatabaseActionError : ActionError = {
        code : undefined,
        message : undefined
    };

    /**
     * @description This data field represents the add database response.
     * @type {IAddDatabaseResponse}
     */
    private _addDatabaseResponse : IAddDatabaseResponse = {
        message : undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs during the
     * add database query.</p>
     * @type {ActionError}
     */
    private _addDatabaseActionError : ActionError = {
        code : undefined,
        message : undefined
    };


    /**
     * @description This data field represents the find database response.
     * @type {IFindDatabaseResponse}
     */
    private _findDatabaseResponse : IDatabase = {
        _id : undefined,
        dbName : undefined,
        password : undefined,
        username : undefined,
        host : undefined,
        port : undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs during the
     * find database query.</p>
     * @type {ActionError}
     */
    private _findDatabaseActionError : ActionError = {
        code : undefined,
        message : undefined
    };

    /**
     * @description This data field represents the get all databases response.
     * @type {IRemoveDatabaseResponse[]}
     */
    private _getAllDatabasesResponse : IDatabase[] = [];

    /**
     * @description
     * <p>This data field represents an error occurs during the
     * get all databases query.</p>
     * @type {ActionError}
     */
    private _getAllDatabasesActionError : ActionError = {
        code : undefined,
        message : undefined
    };

    /**
     * @description This data field represents the update a database response.
     * @type {IUpdateDatabaseResponse}
     */
    private _updateDatabaseResponse : IDatabase = {
        _id : undefined,
        dbName : undefined,
        password : undefined,
        username : undefined,
        host : undefined,
        port : undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs during the
     * update database query.</p>
     * @type {ActionError}
     */
    private _updateDatabaseActionError : ActionError = {
        code : undefined,
        message : undefined
    };

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a DatabaseStore and registers it to multiple
     * dispatchers. </p>
     * @return {DatabaseStore}
     */
    constructor() {
        super();
        this.actionRegister(this);
    }

    /**
     * @description attach a React component as a listener to this store
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback</p>
     * @returns {void}
     */
    public addChangeListener(callback : () => void) : void {
        this.on(DatabaseStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Remove a listener.
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback.</p>
     * @returns {void}
     */
    public removeChangeListener(callback : () => void) : void {
        this.removeListener(DatabaseStore.CHANGE_EVENT, callback);
    }


    /**
     * @description Check if the remove database response is not correct.
     * @returns {boolean}
     */
    public isRemoveDatabaseErrored() : boolean {
        if (this._removeDatabaseActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the action error of the remove database query.
     * @returns {ActionError}
     */
    public geRemoveDatabaseError() : ActionError {
        return this._removeDatabaseActionError;
    }

    /**
     * @description Check if the add database response is not correct.
     * @returns {boolean}
     */
    public isAddDatabaseErrored() : boolean {
        if (this._addDatabaseActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the action error of the add database query.
     * @returns {ActionError}
     */
    public getAddDatabaseError() : ActionError {
        return this._addDatabaseActionError;
    }

    /**
     * @description Check if the find database response is not correct.
     * @returns {boolean}
     */
    public getFindDatabaseResponse() : IDatabase {
        return this._findDatabaseResponse;
    }


    /**
     * @description Check if the find database response is not correct.
     * @returns {boolean}
     */
    public isFindDatabaseErrored() : boolean {
        if (this._findDatabaseActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the error of the find database query.
     * @returns {ActionError}
     */
    public getFindDatabaseError() : ActionError {
        return this._findDatabaseActionError;
    }


    /**
     * @description Check if the get all databases response is not correct.
     * @returns {boolean}
     */
    public getAllDatabasesResponse() : IDatabase[] {
        return this._getAllDatabasesResponse;
    }

    /**
     * @description Check if the get all databases response is not correct.
     * @returns {boolean}
     */
    public isGetAllDatabasesErrored() : boolean {
        if (this._getAllDatabasesActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the error of the get all databases query.
     * @returns {ActionError}
     */
    public getAllDatabasesError() : ActionError {
        return this._getAllDatabasesActionError;
    }

    /**
     * @description Return the update database response.
     * @returns {boolean}
     */
    public updateDatabaseResponse() : IDatabase {
        return this._updateDatabaseResponse;
    }

    /**
     * @description Check if the update database response is not correct.
     * @returns {boolean}
     */
    public isUpdateDatabaseErrored() : boolean {
        if (this._updateDatabaseActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the error of the update database query.
     * @returns {ActionError}
     */
    public getUpdateDatabaseError() : ActionError {
        return this._updateDatabaseActionError;
    }



    /**
     * @description Registers the sessionStore to multiple dispatchers.
     * @param store {SessionStore}
     * @returns {void}
     */
    private actionRegister(store : DatabaseStore) : void {

        DispatcherRemoveDatabase.register(
            function (action : Action<IRemoveDatabaseResponse> ) : void {
                if (action.actionData) {
                    store._removeDatabaseResponse = action.actionData;
                    store._removeDatabaseActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._removeDatabaseActionError = action.actionError;
                    store._removeDatabaseResponse = {
                        message: undefined
                    };
                }
                store.emitChange();
            });

        DispatcherAddDatabase.register(
            function (action : Action<IAddDatabaseResponse> ) : void {
                if (action.actionData) {
                    store._addDatabaseResponse = action.actionData;
                    store._addDatabaseActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._addDatabaseActionError = action.actionError;
                    store._addDatabaseResponse = {
                        message: undefined
                    };
                }
                store.emitChange();
            });

        DispatcherFindDatabase.register(
            function (action : Action<IDatabase> ) : void {
                if (action.actionData) {
                    store._findDatabaseResponse = action.actionData;
                    store._findDatabaseActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._findDatabaseActionError = action.actionError;
                    store._findDatabaseResponse = {
                        _id : undefined,
                        dbName : undefined,
                        password : undefined,
                        username : undefined,
                        host : undefined,
                        port : undefined
                    };
                }
                store.emitChange();
            });


        DispatcherGetAllDatabase.register(
            function (action : Action<IDatabase[]> ) : void {
                if (action.actionData) {
                    store._getAllDatabasesResponse = action.actionData;
                    store._getAllDatabasesActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._getAllDatabasesActionError = action.actionError;
                    store._getAllDatabasesResponse = [];
                }
                store.emitChange();
            });

        DispatcherUpdateDatabase.register(
            function (action : Action<IDatabase> ) : void {
                if (action.actionData) {
                    store._updateDatabaseResponse = action.actionData;
                    store._updateDatabaseActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._updateDatabaseActionError = action.actionError;
                    store._updateDatabaseResponse = {
                        _id : undefined,
                        dbName : undefined,
                        password : undefined,
                        username : undefined,
                        host : undefined,
                        port : undefined
                    };
                }
                store.emitChange();
            });
    }

    /**
     * @description Emit changes to React components.
     * @returns {void}
     */
    private emitChange() : void {
        this.emit(DatabaseStore.CHANGE_EVENT);
    }
}

let databaseStore : DatabaseStore = new DatabaseStore();
export default databaseStore;
