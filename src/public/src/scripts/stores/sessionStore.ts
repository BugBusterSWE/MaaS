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
 *
 *
 * @author Luca Bianco
 * @copyright MIT
 */
class SessionStore extends EventEmitter {

    /**
     * @description string for events management.
     */
    private static CHANGE_EVENT : string = "change";

    private _loginResponse : ILoginResponse = {
        status : undefined,
        token : "",
        user_id : "",
        email : "",
        level : "",
        code : "",
        message : "",
    }

    private _actionError : Object;


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

    public isLoggedIn() : boolean {
        return this._loginResponse.status === 200;
    }

    public getStatus() : number {
        return this._loginResponse.status;
    }

    public getAccessToken() : string  {
        return this._loginResponse.token;
    }

    public getEmail() : string  {
        return this._loginResponse.email;
    }

    public getUserId() : string {
        return this._loginResponse.user_id;
    }

    public getLevel() : string {
        return this._loginResponse.level;
    }

    public getCode() : string {
        return this._loginResponse.code;
    }

    public getMessage() : string  {
        return this._loginResponse.message;
    }

    public getActionError() : Object  {
        return this._actionError;
    }

    public getAllErrors() : string  {
        let errorMessage : string = "";
        if (!(this.getStatus() === 200)) {
            errorMessage = this.getMessage() + " ";
        }
        if (this.getActionError()) {
            errorMessage = errorMessage + JSON.stringify(this.getActionError);
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
                    if (action.actionData.status == 200) {
                        console.log("LOGIN TOKEN")
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
            store._loginResponse = undefined;
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

/**
 * @description The SessionStore object to export as a singleton.
 */
let sessionStore : SessionStore = new SessionStore();
export default sessionStore;
