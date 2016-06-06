import {Action} from "../dispatcher/dispatcher";
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
        status : undefined,
        token : undefined,
        user_id : undefined,
        email : undefined,
        level : undefined,
        code : undefined,
        message : undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs during the login query.</p>
     * @type {undefined}
     * @private
     */
    private _actionError : Object = undefined;


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
        return this._loginResponse.status === 200;
    }

    /**
     * @description Return the login response status.
     * @returns {number}
     * <p>The login response status. It may return undefined if
     * the user didn't do login or he done logout.</p>
     */
    public getStatus() : number {
        return this._loginResponse.status;
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
     * @description Return the login response error code.
     * @returns {string}
     * <p>The login response code error. It may return undefined if the user
     * didn't do login, he done logout or the error don't occurs.</p>
     */
    public getCode() : string {
        return this._loginResponse.code;
    }

    /**
     * @description Return the login response message.
     * @returns {string}
     * <p>The login response message. It may return undefined if
     * the user didn't do login or he done logout.</p>
     */
    public getMessage() : string  {
        return this._loginResponse.message;
    }

    /**
     * @description Return the action error.
     * @returns {Object}
     * <p>The action error. It may return undefined if
     * the login query is done successfully.</p>
     */
    public getActionError() : Object  {
        return this._actionError;
    }

    /**
     * @description
     * <p>Return the message error from the login response and/or the
     * action error.</p>
     * @returns {string}
     */
    public getAllErrors() : string  {
        let errorMessage : string = "";
        if (!(this.getStatus() === 200) && this.getMessage()) {
            errorMessage = this.getMessage() + " ";
        }
        if (this.getActionError()) {
            errorMessage = errorMessage + JSON.stringify(this.getActionError());
        }
        return errorMessage;
    }


    /**
     * @description Registers the sessionStore to multiple dispatchers.
     * @param store {SessionStore}
     * @returns {void}
     */
    private actionRegister(store : SessionStore) : void {
        console.log("login register");
        DispatcherLogin.register(
            function (action : Action<ILoginResponse> ) : void {
                console.log("LOGIN");
                if (action.actionData) {
                    if (action.actionData.status === 200) {
                        console.log("LOGIN TOKEN");
                        store._loginResponse = action.actionData;
                        sessionStorage.setItem("accessToken",
                            action.actionData.token);
                        sessionStorage.setItem("email",
                            action.actionData.email);
                        sessionStorage.setItem("level",
                            action.actionData.level);
                    } else {
                        store._loginResponse = action.actionData;
                    }
                } else {
                    store._actionError = action.actionError;
                }
                store.emitChange();
        });

        DispatcherLogout.register(function () : void {
            store._loginResponse = {
                status : undefined,
                token : undefined,
                user_id : undefined,
                email : undefined,
                level : undefined,
                code : undefined,
                message : undefined
            };
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("level");
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
