import {Action} from "../dispatcher/dispatcher";
import {DispatcherLogin, ILoginResponse} from "../actions/sessionActionCreator";
import {DispatcherLogout} from "../actions/sessionActionCreator";
import {EventEmitter} from "events";

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
    private _accessToken : string;
    private _email : string;
    private _actionError : Object;
    private _error : string;
    private _userId : string;

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
        return this._accessToken ? true : false;
    }

    public getAccessToken() : string  {
        return this._accessToken;
    }

    public getEmail() : string  {
        return this._email;
    }

    public getActionError() : Object  {
        return this._actionError;
    }

    public getError() : string  {
        return this._error;
    }

    public getUserId() : string {
        return this._userId;
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
                    if (action.actionData.token) {
                        console.log("LOGIN TOKEN")
                        store._accessToken = action.actionData.token;
                        store._userId = action.actionData.user_id;
                        store._email = action.actionData.email;
                        sessionStorage.setItem("accessToken",
                            store._accessToken);
                        sessionStorage.setItem("email", this._email);
                    } else {
                        store._error = action.actionData.error;
                    }
                } else {
                    store._actionError = action.actionError;
                }
                store.emitChange();
        });

        DispatcherLogout.register(function () : void {
            store._accessToken = undefined;
            store._email = undefined;
            store._userId = undefined;
            store._error = undefined;
            store._actionError = undefined;
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("email");
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
