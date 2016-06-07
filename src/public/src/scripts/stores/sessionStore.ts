import {Action, ActionError} from "../dispatcher/dispatcher";
import {DispatcherLogin, ILoginResponse} from "../actions/sessionActionCreator";
import {DispatcherLogout} from "../actions/sessionActionCreator";
import {EventEmitter} from "events";

export class PermissionLevel {
    public static GUEST : string = "GUEST";
    public static MEMBER : string = "MEMBER";
    public static ADMIN : string = "ADMIN";
    public static OWNER : string = "OWNER";
    public static SUPERADMIN : string = "SUPERADMIN";
}

/**
 * SessionStore contains all the logic of sessions.
 *
 *
 * @history
 * | Author           | Action Performed          | Data       |
 * | ---              | ---                       | ---        |
 * | Luca Bianco      | Create class SessionStore | 29/05/2016 |
 * | Davide Rigoni    | Update SessionStore       | 06/06/2016 |
 *
 * @author Luca Bianco
 * @author Davide Rigoni
 * @copyright MIT
 */
class SessionStore extends EventEmitter {

    /**
     * @description String for events management.
     */
    private static CHANGE_EVENT : string = "change";

    /**
     * @description This data field represents the login response.
     * @type {ILoginResponse}
     * @private
     */
    private _loginResponse : ILoginResponse = {
        token : undefined,
        user_id : undefined,
        email : undefined,
        level : undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs during the login query.</p>
     * @type {ActionError}
     * @private
     */
    private _actionError : ActionError = {
        code : undefined,
        message : undefined
    };


    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a SessionStore and registers it to multiple
     * dispatchers. </p>
     * @return {SessionStore}
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
        this.on(SessionStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Remove a listener.
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback.</p>
     * @returns {void}
     */
    public removeChangeListener(callback : () => void) : void {
        this.removeListener(SessionStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Check if the user is logged in MaaS.
     * @returns {boolean}
     */
    public isLoggedIn() : boolean {
        if (this._loginResponse.token) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the user token.
     * @returns {string}
     * <p>The user token. It may return undefined if
     * the user didn't do login or he done logout.</p>
     */
    public getAccessToken() : string  {
        return this._loginResponse.token;
    }

    /**
     * @description Return the user email.
     * @returns {string}
     * <p>The user email. It may return undefined if
     * the user didn't do login or he done logout.</p>
     */
    public getEmail() : string  {
        return this._loginResponse.email;
    }

    /**
     * @description Return the user ID.
     * @returns {string}
     * <p>The user ID. It may return undefined if
     * the user didn't do login or he done logout.</p>
     */
    public getUserId() : string {
        return this._loginResponse.user_id;
    }

    /**
     * @description Return the user level permission.
     * @returns {string}
     * <p>The user level. It may return undefined if
     * the user didn't do login or he done logout.</p>
     */
    public getLevel() : string {
        return this._loginResponse.level;
    }

    /**
     * @description Check if the login response is not correct.
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
     * @description Return the login response error code.
     * @returns {string}
     * <p>The login response code error. It may return undefined if the user
     * didn't do login, he done logout or the error don't occurs.</p>
     */
    public getErrorCode() : string {
        return this._actionError.code;
    }


    /**
     * @description Return the action error.
     * @returns {string}
     * <p>The action error. It may return undefined if
     * the login query is done successfully.</p>
     */
    public getErrorMessage() : string  {
        return this._actionError.message;
    }


    /**
     * @description Registers the sessionStore to multiple dispatchers.
     * @param store {SessionStore}
     * @returns {void}
     */
    private actionRegister(store : SessionStore) : void {

        DispatcherLogin.register(
            function (action : Action<ILoginResponse> ) : void {
                if (action.actionData) {
                    store._loginResponse = action.actionData;
                    store._actionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    console.log("error " + action.actionError.message);
                    store._actionError = action.actionError;
                    store._loginResponse = {
                        token : undefined,
                        user_id : undefined,
                        email : undefined,
                        level : undefined
                    };
                }
                store.emitChange();
        });

        DispatcherLogout.register(function () : void {
            store._loginResponse = {
                token : undefined,
                user_id : undefined,
                email : undefined,
                level : undefined
            };
            store._actionError = {
                code : undefined,
                message : undefined
            }
            store.emitChange();
        });

    }

    /**
     * @description Emit changes to React components.
     * @returns {void}
     */
    private emitChange() : void {
        this.emit(SessionStore.CHANGE_EVENT);
    }
}

let sessionStore : SessionStore = new SessionStore();
export default sessionStore;
