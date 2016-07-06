import {Action, ActionError} from "../dispatcher/dispatcher";
import {EventEmitter} from "events";
import {
    DispatcherUserRegistration, IUserRegistrationResponse,
    DispatcherRemoveProfile, IRemoveProfileResponse,
    DispatcherUpdateEmail, IUpdateUserEmailResponse,
    DispatcherUpdatePassword, IUpdateUserPasswordResponse, ISuperAdmin,
    DispatcherSuperAdminCreation, ISuperAdminCreationResponse,
    DispatcherSuperAdminData,
    DispatcherRecoveryPassword, IRecoveryPasswordResponse
} from "../actions/userActionCreator";

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
     * @description This data field represents the recovery password response.
     * @type {IRecoveryPasswordResponse}
     */
    private _recoveryPasswordResponse : IRecoveryPasswordResponse = {
        message: undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs during
     * recovery password query.</p>
     * @type {ActionError}
     */
    private _recoveryPasswordActionError : ActionError = {
        code : undefined,
        message : undefined
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
     * @description This data field represents the new user response.
     * @type {ISuperAdminCreationResponse}
     */
    private _superAdminCreationResponse : ISuperAdminCreationResponse = {
        message: ""
    };

    /**
     * @description
     * <p>This data field represents an error occurs during the query.</p>
     * @type {ActionError}
     */
    private _superAdminCreationActionError : ActionError = {
        code : undefined,
        message : undefined
    };

    /**
     * @description Contains the data of all Super Admins.
     */
    private _superAdminsList : ISuperAdmin[] = [];

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
        return this._removeProfileActionError.message;
    }

    /**
     * @description Check if the recovery password response is not correct.
     * @returns {boolean}
     */
    public isRecoveryPasswordErrored() : boolean {
        if (this._recoveryPasswordActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the action error code of the recovery password query.
     * @returns {string}
     * <p>The error response code. It may return undefined
     * if the query is done successfully</p>
     */
    public getRecoveryPasswordErrorCode() : string {
        return this._recoveryPasswordActionError.code;
    }


    /**
     * @description
     * <p>Return the action error message of the recovery password
     * query.</p>
     * @returns {string}
     * <p>The error response message. It may return undefined if
     * the query is done successfully.</p>
     */
    public getRecoveryPasswordErrorMessage() : string  {
        return this._recoveryPasswordActionError.message;
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
     * @description
     * <p>Return a list of Super Admins registered in the System</p>
     * @returns {ISuperAdmin}
     * <p>An array of Super Admins</p>
     */
    public getAllSuperAdmin() : ISuperAdmin[] {

        return this._superAdminsList;
    }
    /**
     * @description <p>Check if the super admin registration response is not
     * correct.</p>
     * @returns {boolean}
     */
    public isSuperAdminCreationErrored() : boolean {
        if (this._superAdminCreationActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the super admin registration response error code.
     * @returns {string}
     * <p>The super admin response code error. It may return undefined
     * if the query is done successfully</p>
     */
    public getSuperAdminCreationErrorCode() : string {
        return this._superAdminCreationActionError.code;
    }


    /**
     * @description Return the action error.
     * @returns {string}
     * <p>The action error. It may return undefined if
     * the query is done successfully.</p>
     */
    public getSuperAdminCreationErrorMessage() : string  {
        return this._superAdminCreationActionError.message;
    }

    /**
     * @description Update the members array.
     * @param data {IMember[]} The members to update.
     * @returns {void}
     */
    public updateSuperAdmin (data : ISuperAdmin[]) : void {
        this._superAdminsList = data;
    }


    /**
     * @description Registers the userStore to multiple dispatchers.
     * @param store {UserStore}
     * @returns {void}
     */
    private actionRegister(store : UserStore) : void {

        DispatcherSuperAdminData.register(
            function (action : Action<ISuperAdmin[]> ) : void {
                store.updateSuperAdmin(action.actionData);
                store.emitChange();
            });


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
                store._updateEmailActionError = action.actionError;
                store.emitChange();
            });

        DispatcherUpdatePassword.register(
            function (action : Action<IUpdateUserPasswordResponse> ) : void {
                store._updatePasswordActionError = action.actionError;
                store.emitChange();
            });

        DispatcherSuperAdminCreation.register(
            function (action : Action<ISuperAdminCreationResponse> ) : void {
                if (action.actionData) {
                    console.log("Dispatcher Add Super Admin actionData");
                    store._superAdminCreationResponse = action.actionData;
                    store._superAdminCreationActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    console.log("Dispatcher Add Super Admin Error");
                    console.log("Error: " + action.actionError.message);
                    console.log("Code: " + action.actionError.code);
                    store._superAdminCreationActionError = action.actionError;
                    store._superAdminCreationResponse = {
                        message : ""
                    };
                }
                store.emitChange();
            });

        DispatcherRecoveryPassword.register(
            function (action : Action<IRecoveryPasswordResponse> ) : void {
                if (action.actionData) {
                    store._recoveryPasswordResponse = action.actionData;
                    store._recoveryPasswordActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._recoveryPasswordActionError = action.actionError;
                    store._recoveryPasswordResponse = {
                        message : ""
                    };
                }
                store.emitChange();
            });

    }

    /**
     * @description Emit changes to React pages.
     * @returns {void}
     */
    private emitChange() : void {
        this.emit(UserStore.CHANGE_EVENT);
    }
}

let userStore : UserStore = new UserStore();
export default userStore;
