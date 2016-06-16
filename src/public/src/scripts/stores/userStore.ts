import {Action, ActionError} from "../dispatcher/dispatcher";
import {EventEmitter} from "events";
import {DispatcherUserRegistration, IUserRegistrationResponse,
    DispatcherRemoveProfile, IRemoveProfileResponse,
    DispatcherUpdateEmail, IUpdateUserEmailResponse,
    DispatcherUpdatePassword, IUpdateUserPasswordResponse
}
    from "../actions/userActionCreator";


/**
 * SessionStore contains all the logic of sessions.
 *
 *
 * @history
 * | Author           | Action Performed          | Data       |
 * | ---              | ---                       | ---        |
 * | Davide Rigoni    | Create class SessionStore | 15/06/2016 |
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
     * @description This data field represents the update email response.
     * @type {IUpdateUserEmailResponse}
     */
    private _updateEmailResponse : IUpdateUserEmailResponse = {
        message: undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs during
     * update email query.</p>
     * @type {ActionError}
     */
    private _updateEmailActionError : ActionError = {
        code : undefined,
        message : undefined
    };

    /**
     * @description This data field represents the update password response.
     * @type {IUpdateUserPasswordResponse}
     */
    private _updatePasswordResponse : IUpdateUserPasswordResponse = {
        message: undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs during
     * update password query.</p>
     * @type {ActionError}
     */
    private _updatePasswordActionError : ActionError = {
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
     * @description Return the action error code of the user registration query.
     * @returns {string}
     * <p>The error response code. It may return undefined
     * if the query is done successfully</p>
     */
    public geUserRegistrationtErrorCode() : string {
        return this._userRegistrationActionError.code;
    }


    /**
     * @description
     * </p>Return the action error message of the user registration query.</p>
     * @returns {string}
     * <p>The error response message. It may return undefined if
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
     * @description Return the action error code of the remove profile query.
     * @returns {string}
     * <p>The error response code. It may return undefined
     * if the query is done successfully</p>
     */
    public getRemoveProfileErrorCode() : string {
        return this._removeProfileActionError.code;
    }


    /**
     * @description Return the action error message of the remove profile query.
     * @returns {string}
     * <p>The error response message. It may return undefined if
     * the query is done successfully.</p>
     */
    public getRemoveProfileErrorMessage() : string  {
        return this._userRegistrationActionError.message;
    }

    /**
     * @description Check if the update email response is not correct.
     * @returns {boolean}
     */
    public isUpdateEmailErrored() : boolean {
        if (this._updateEmailActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the action error code of the update email query.
     * @returns {string}
     * <p>The error response code. It may return undefined
     * if the query is done successfully</p>
     */
    public getUpdateEmailErrorCode() : string {
        return this._updateEmailActionError.code;
    }


    /**
     * @description Return the action error message of the update email query.
     * @returns {string}
     * <p>The error response message. It may return undefined if
     * the query is done successfully.</p>
     */
    public getUpdateEmailErrorMessage() : string  {
        return this._updateEmailActionError.message;
    }

    /**
     * @description Check if the update password response is not correct.
     * @returns {boolean}
     */
    public isUpdatePasswordErrored() : boolean {
        if (this._updatePasswordActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the action error code of the update password query.
     * @returns {string}
     * <p>The error response code. It may return undefined
     * if the query is done successfully</p>
     */
    public getUpdatePasswordErrorCode() : string {
        return this._updatePasswordActionError.code;
    }


    /**
     * @description
     * <p>Return the action error message of the update password query.</p>
     * @returns {string}
     * <p>The error response message. It may return undefined if
     * the query is done successfully.</p>
     */
    public getUpdatePasswordErrorMessage() : string  {
        return this._updatePasswordActionError.message;
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

        DispatcherUpdateEmail.register(
            function (action : Action<IUpdateUserEmailResponse> ) : void {
                if (action.actionData) {
                    store._updateEmailResponse = action.actionData;
                    store._updateEmailActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._updateEmailActionError = action.actionError;
                    store._updateEmailResponse = {
                        message : undefined
                    };
                }
                store.emitChange();
            });

        DispatcherUpdatePassword.register(
            function (action : Action<IUpdateUserPasswordResponse> ) : void {
                if (action.actionData) {
                    store._updatePasswordResponse = action.actionData;
                    store._updatePasswordActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._updatePasswordActionError = action.actionError;
                    store._updatePasswordResponse = {
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
