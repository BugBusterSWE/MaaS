///<reference path='../../../typings/tsd.d.ts'/>
///<reference path='../../../typings/node/node.d.ts'/>

import Dispatcher from "../dispatcher/dispatcher.ts";
import Constants from "../constants/myConstants.ts"
import * as Events from "events";

let CHANGE_EVENT : string = "change";

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localStorage

let _accessToken = sessionStorage.getItem('accessToken');
let _email = sessionStorage.getItem('email');
let _errors : Array<Object> = [];

class SessionStore extends Events.EventEmitter {

    constructor(){
        super();
        this.actionRegister(this);
    }

    actionRegister(sessionStore: SessionStore) : void {

        Dispatcher.register(function (payload) : void {
            let action = payload.action;
            switch (action.actionType) {

                case Constants.SIGNUP:
                    // to implement
                    break;

                case Constants.LOGIN:
                    if(action.json && action.json.access_token) {
                        _accessToken = action.json.access_token;
                        _email = action.json.email;
                        // Token will always live in the session, so that the API can grab it with no hassle
                        sessionStorage.setItem('accessToken', _accessToken);
                        sessionStorage.setItem('email', _email);
                    }
                    if (action.errors) {
                        _errors = action.errors;
                    }
                    sessionStore.emitChange();
                    break;

                case Constants.LOGOUT:
                    _accessToken = null;
                    _email = null;
                    sessionStorage.removeItem('accessToken');
                    sessionStorage.removeItem('email');
                    sessionStore.emitChange();
                    break;

                default:
                // Do nothing​
            }

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

}

let sessionStore : SessionStore = new SessionStore();

export default sessionStore;