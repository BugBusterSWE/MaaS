import {Action, ActionError} from "../dispatcher/dispatcher";
import {EventEmitter} from "events";
import {IUserRegistrationResponse, DispatcherUserRegistration}
    from "../actions/userActionCreator";


/**
 * SessionStore contains all the logic of sessions.
 *
 *
 * @history
 * | Author           | Action Performed          | Data       |
 * | ---              | ---                       | ---        |
 * | Luca Bianco      | Create class SessionStore | 15/06/2016 |
 *
 * @author Davide Rigoni
 * @copyright MIT
 */
class UserStore extends EventEmitter {

    /**
     * @description String for events management.
     */
    private static CHANGE_EVENT : string = "change";

    /**
     * @description This data field represents the new user response.
     * @type {IUserRegistrationResponse}
     */
    private _registrationResponse : IUserRegistrationResponse = {
        message: ""
    };

    /**
     * @description
     * <p>This data field represents an error occurs during the query.</p>
     * @type {ActionError}
     */
    private _actionError : ActionError = {
        code : undefined,
        message : undefined
    };

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a UserStore and registers it to multiple
     * dispatchers. </p>
     * @return {UserStore}
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
        this.on(UserStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Remove a listener.
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback.</p>
     * @returns {void}
     */
    public removeChangeListener(callback : () => void) : void {
        this.removeListener(UserStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Check if the user registration response is not correct.
     * @returns {boolean}
     */
    public isErrored() : boolean {
        if (this._actionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the user registration response error code.
     * @returns {string}
     * <p>The user response code error. It may return undefined
     * if the query is done successfully</p>
     */
    public getErrorCode() : string {
        return this._actionError.code;
    }


    /**
     * @description Return the action error.
     * @returns {string}
     * <p>The action error. It may return undefined if
     * the query is done successfully.</p>
     */
    public getErrorMessage() : string  {
        return this._actionError.message;
    }

    /**
     * @description Registers the userStore to multiple dispatchers.
     * @param store {UserStore}
     * @returns {void}
     */
    private actionRegister(store : UserStore) : void {

        DispatcherUserRegistration.register(
            function (action : Action<IUserRegistrationResponse> ) : void {
                if (action.actionData) {
                    store._registrationResponse = action.actionData;
                    store._actionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._actionError = action.actionError;
                    store._registrationResponse = {
                        message : ""
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
        this.emit(UserStore.CHANGE_EVENT);
    }
}

let userStore : UserStore = new UserStore();
export default userStore;
