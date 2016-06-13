import {Action, ActionError} from "../dispatcher/dispatcher";
import {EventEmitter} from "events";


/**
 * SessionStore contains all the logic of sessions.
 *
 *
 * @history
 * | Author           | Action Performed          | Data       |
 * | ---              | ---                       | ---        |
 * | Luca Bianco      | Create class SessionStore | 15/06/2016 |
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
     * @description Registers the userStore to multiple dispatchers.
     * @param store {UserStore}
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
