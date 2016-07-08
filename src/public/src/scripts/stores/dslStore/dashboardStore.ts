import {IDashboard} from "../../utils/dslDefinitions"
import {DispatcherDashboardData}
    from "../../actions/dslActionCreator/dashboardActionCreator";
import {EventEmitter} from "events";
import {Action, ActionError} from "../../dispatcher/dispatcher";

/**
 * DashboardStore contains all the logic of all the Dashboard Entity.
 *
 *
 * @history
 * | Author           | Action Performed            | Data       |
 * | ---              | ---                         | ---        |
 * | Emanuele Carraro | Create class DashboardStore | 4/07/2016  |
 *
 *
 * @author Emanuele Carraro
 * @copyright MIT
 */
class DashboardStore extends EventEmitter {

    /**
     * @description string for events management.
     */
    private static CHANGE_EVENT : string = "change";

    /**
     * @description Contains the data of the dashboard.
     */
    private dashboard : IDashboard = {rows : []};

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a DashboardStore and registers it to multiple
     * dispatchers. </p>
     * @return {DashboardStore}
     */
    constructor() {
        super();
        this.actionRegister(this);
    }

    /**
     * @description Get the data of the dashboard.
     * @returns {IDashboard}
     */
    public getDashboard() : IDashboard {
        return this.dashboard;
    }

    /**
     * @description Update the dashboard.
     * @param data {IDashboard} The data of the dashboard.
     * @returns {void}
     */
    public updateData(data : IDashboard) : void {
        console.log("update dashboard");
        console.log(data.rows[0]);
        this.dashboard = data;
    }

    /**
     * @description attach a React component as a listener to this store
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback</p>
     * @returns {void}
     */
    public addChangeListener(callback : () => void) : void {
        this.on(DashboardStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Remove a listener.
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback.</p>
     * @returns {void}
     */
    public removeChangeListener(callback : () => void) : void {
        this.removeListener(DashboardStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Registers the dashboardStore to multiple dispatchers.
     * @param store {DashboardStore}
     * @returns {void}
     */
    private actionRegister(store : DashboardStore) : void {

        DispatcherDashboardData.register(
            function (action : Action<IDashboard>) : void {
                store.updateData(action.actionData);
                store.emitChange();
            }
        );

    }

    /**
     * @description Emit changes to React components.
     * @returns {void}
     */
    private emitChange() : void {
        this.emit(DashboardStore.CHANGE_EVENT);
    }

}

let store : DashboardStore = new DashboardStore();
export default store;
