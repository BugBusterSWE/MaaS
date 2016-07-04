import Dispatcher, {Action, ActionError} from "../../dispatcher/dispatcher";
import dashboardAPIs from "../../utils/dslAPI/dashboardAPI";
import {IDashboard, IDashboardRow} from "../../utils/dslDefinitions";

export let DispatcherDashboardData : Dispatcher<Action<IDashboard>> =
    new Dispatcher<Action<IDashboard>>();

/**
 * This class represents the creator of the action of the dashboard.
 *
 * @history
 * | Author           | Action Performed                    | Data       |
 * |------------------|-------------------------------------|------------|
 * | Emanuele Carraro | Create CompanyActionCreator class   | 04/07/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 *
 */
class DashboardActionCreator {

    /**
     * @description Dispatch the action to get the data of the dashboard.
     */
    public getDashboardData() : void {
        console.log("get dashboard data");
        dashboardAPIs
            .getDashboardData()
            .then(function (data : IDashboard) : void {
                DispatcherDashboardData.dispatch({
                    actionData : data,
                    actionError : undefined
                })
            })
    }

}

let dashboardActionCreator : DashboardActionCreator =
    new DashboardActionCreator();
export default dashboardActionCreator;
