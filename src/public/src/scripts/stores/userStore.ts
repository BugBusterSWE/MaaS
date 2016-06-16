import {Action, ActionError} from "../dispatcher/dispatcher";
import {EventEmitter} from "events";
import {IUserRegistrationResponse, DispatcherUserRegistration,
    IRemoveProfileResponse, DispatcherRemoveProfile}
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
    private _userRegistrationResponse : IUserRegistrationResponse = {
        message: ""
    };

    /**
     * @description
     * <p>This data field represents an error occurs during the query.</p>
     * @type {ActionError}
     */
    private _userRegistrationActionError : ActionError = {
        code : undefined,
        message : undefined
    };

    /**
     * @description This data field represents the remove profile response.
     * @type {IRemoveProfileResponse}
     */
    private _removeProfileResponse : IRemoveProfileResponse = {
        message: undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs during
     * remove profile query.</p>
     * @type {ActionError}
     */
    private _removeProfileActionError : ActionError = {
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
    public isUserRegistrationErrored() : boolean {
        if (this._userRegistrationActionError.code) {
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
    public geUserRegistrationtErrorCode() : string {
        return this._userRegistrationActionError.code;
    }


    /**
     * @description Return the action error.
     * @returns {string}
     * <p>The action error. It may return undefined if
     * the query is done successfully.</p>
     */
    public getUserRegistrationErrorMessage() : string  {
        return this._userRegistrationActionError.message;
    }

    /**
     * @description Check if the remove profile response is not correct.
     * @returns {boolean}
     */
    public isRemoveProfileErrored() : boolean {
        if (this._removeProfileActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the remove profile response error code.
     * @returns {string}
     * <p>The user response code error. It may return undefined
     * if the query is done successfully</p>
     */
    public getRemoveProfileErrorCode() : string {
        return this._removeProfileActionError.code;
    }


    /**
     * @description Return the action error of the remove profile query.
     * @returns {string}
     * <p>The action error. It may return undefined if
     * the query is done successfully.</p>
     */
    public getRemoveProfileErrorMessage() : string  {
        return this._userRegistrationActionError.message;
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
                    store._userRegistrationResponse = action.actionData;
                    store._userRegistrationActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._userRegistrationActionError = action.actionError;
                    store._userRegistrationResponse = {
                        message : undefined
                    };
                }
                store.emitChange();
            });

        DispatcherRemoveProfile.register(
            function (action : Action<IRemoveProfileResponse> ) : void {
                if (action.actionData) {
                    store._removeProfileResponse = action.actionData;
                    store._removeProfileActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._removeProfileActionError = action.actionError;
                    store._removeProfileResponse = {
                        message : undefined
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
