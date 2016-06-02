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

    private static _accessToken : string =
        sessionStorage.getItem("accessToken");
    private static _email : string = sessionStorage.getItem("email");
    private static _errors : string;
    private static _userId : string = sessionStorage.getItem("userId");

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
     * @description Registers the sessionStore to multiple dispatchers.
     * @param sessionStore {SessionStore}
     * @returns {void}
     */
    actionRegister(sessionStore : SessionStore) : void {
        console.log("login register");
        DispatcherLogin.register(
            function (action : Action<ILoginResponse> ) : void {
            console.log("LOGIN");
            if (action.data.token) {
                console.log("LOGIN TOKEN");
                SessionStore._accessToken = action.data.token;
                SessionStore._userId = action.data.user_id;
                SessionStore._email = action.data.email;
                // Token will always live in the session, so that the
                // API can grab it with no hassle
                sessionStorage.
                    setItem("accessToken", SessionStore._accessToken);
                sessionStorage.setItem("email", SessionStore._email);
            } else {
                SessionStore._errors = action.errors;
            }
            sessionStore.emitChange();
        });

        DispatcherLogout.register(function () : void {
            SessionStore._accessToken = undefined;
            SessionStore._email = undefined;
            SessionStore._userId = undefined;
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("userId");
            sessionStore.emitChange();
        });

    }

    /**
     * @description Emit changes to React components.
     * @returns {void}
     */
    emitChange() : void {
        this.emit(SessionStore.CHANGE_EVENT);
    }

    /**
     * @description attach a React component as a listener to this store
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback</p>
     * @returns {void}
     */
    addChangeListener(callback : () => void) : void {
        this.on(SessionStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Remove a listener.
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback.</p>
     * @returns {void}
     */
    removeChangeListener(callback : () => void) : void {
        this.removeListener(SessionStore.CHANGE_EVENT, callback);
    }

    isLoggedIn() : boolean {
        return SessionStore._accessToken ? true : false;
    }

    getAccessToken() : string  {
        return SessionStore._accessToken;
    }

    getEmail() : string  {
        return SessionStore._email;
    }

    getErrors() : string  {
        return SessionStore._errors;
    }

    getUserId() : string {
        return SessionStore._userId;
    }

}

/**
 * @description The SessionStore object to export as a singleton.
 */
let sessionStore : SessionStore = new SessionStore();

export default sessionStore;
