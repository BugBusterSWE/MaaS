import * as request from "superagent";
import {Response} from "superagent";
import {IDashboard} from "../dslDefinitions"
import {ActionError} from "../../dispatcher/dispatcher";

let dashboard : IDashboard = {
    rows : [
        {
            type : "cell",
            id : "c1"
        },
        {
            type : "cell",
            id : "c2"
        },
        {
            type : "document",
            id : "d1"
        },
        {
            type : "document",
            id : "d2"
        },
        {
            type : "collection",
            id : "c1"
        },
        {
            type : "collection",
            id : "c2"
        }
    ]
};

/**
 * <p>This class represents the APIs used by {DashboardActionCreator}.
 *
 * @history
 * | Author           | Action Performed | Data       |
 * |------------------|------------------|------------|
 * | Davide Rigoni    | Create class     | 04/07/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class DashboardAPIs {

    /**
     * @description
     * <p>This method send a request to the backend of MaaS with the purpose
     * to obtain the dashboard data.</p>
     * @returns {Promise<T>|Promise} The result or the error
     */
    public getDashboardData() : Promise<Object> {
        return new Promise(
            function (resolve : (value : IDashboard) => void,
                      reject : (error : Object) => void) : void {
                resolve(dashboard);
            })
    }
}

let dashboardAPIs : DashboardAPIs = new DashboardAPIs();
export default dashboardAPIs;
