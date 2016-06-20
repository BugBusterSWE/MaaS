import {Action, ActionError} from "../dispatcher/dispatcher";
import {EventEmitter} from "events";

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
     * @description Registers the sessionStore to multiple dispatchers.
     * @param store {SessionStore}
     * @returns {void}
     */
    private actionRegister(store : DatabaseStore) : void {


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
