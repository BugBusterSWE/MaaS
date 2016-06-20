import {Action, ActionError} from "../dispatcher/dispatcher";
import {EventEmitter} from "events";
import {DispatcherRemoveDatabase, IRemoveDatabaseResponse}
    from "../actions/databaseActionCreator";

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
     * @description Return the action error code of the remove database query.
     * @returns {string}
     * <p>The error response code. It may return undefined
     * if the query is done successfully</p>
     */
    public geRemoveDatabaseErrorCode() : string {
        return this._removeDatabaseActionError.code;
    }


    /**
     * @description
     * </p>Return the action error message of the remove database query.</p>
     * @returns {string}
     * <p>The error response message. It may return undefined if
     * the query is done successfully.</p>
     */
    public getRemoveDatabaseErrorMessage() : string  {
        return this._removeDatabaseActionError.message;
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
