import {Dispatcher} from "../dispatcher/dispatcher.ts";
import {DispatcherLogin, ILoginResponse} from "../actions/sessionActionCreator";
import {DispatcherLogout} from "../actions/sessionActionCreator";
import Constants from "../constants/constants.ts"
import {EventEmitter} from "events";

let CHANGE_EVENT : string = "change";

// Load an access token from the session storage, you might want to implement
// A 'remember me' using localStorage

let _accessToken = sessionStorage.getItem("accessToken");
let _email = sessionStorage.getItem("email");
let _errors : string;
let _userId = sessionStorage.getItem("userId");

class SessionStore extends EventEmitter {

    constructor(){
        super();
        this.actionRegister(this);
    }

    actionRegister(sessionStore : SessionStore) : void {

        DispatcherLogin.register(function (action) : void {
            if(action.data.token) {
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
                // todo: error page message
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

    emitChange() : void {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback : () => void) : void {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback : () => void) : void {
        this.removeListener(CHANGE_EVENT, callback);
    }

    isLoggedIn() : boolean {
        return _accessToken ? true : false;
    }

    getAccessToken() {
        return _accessToken;
    }

    getEmail() {
        return _email;
    }

    getErrors() {
        return _errors;
    }

    getUserId() {
        return _userId;
    }

}

let sessionStore : SessionStore = new SessionStore();
export default sessionStore;