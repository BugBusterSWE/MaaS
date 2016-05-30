import {Action} from "../dispatcher/dispatcher";
import {DispatcherLogin, ILoginResponse} from "../actions/sessionActionCreator";
import {DispatcherLogout} from "../actions/sessionActionCreator";
import {EventEmitter} from "events";

// Load an access token from the session storage, you might want to implement
// A 'remember me' using localStorage

let _accessToken : string = sessionStorage.getItem("accessToken");
let _email : string = sessionStorage.getItem("email");
let _errors : string;
let _userId : string = sessionStorage.getItem("userId");

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

        DispatcherLogin.register(
            function (action : Action<ILoginResponse> ) : void {
            if (action.data.token) {
                _accessToken = action.data.token;
                _userId = action.data.user_id;
                _email = action.data.email;
                // Token will always live in the session, so that the
                // API can grab it with no hassle
                sessionStorage.setItem("accessToken", _accessToken);
                sessionStorage.setItem("email", _email);
                this.data.redirectStart.toLocaleString(
                    "/SuperAdmin/ShowCompanies");
            }
            if (action.errors != undefined) {
                _errors = action.errors;
                // TODO: error page message
            }
            sessionStore.emitChange();
        });

        DispatcherLogout.register(function () : void {
            _accessToken = undefined;
            _email = undefined;
            _userId = undefined;
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
        return _accessToken ? true : false;
    }

    getAccessToken() : string  {
        return _accessToken;
    }

    getEmail() : string  {
        return _email;
    }

    getErrors() : string  {
        return _errors;
    }

    getUserId() : string {
        return _userId;
    }

}

/**
 * @description The SessionStore object to export as a singleton.
 */
let sessionStore : SessionStore = new SessionStore();

export default sessionStore;
