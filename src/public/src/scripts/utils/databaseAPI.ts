import * as request from "superagent";
import * as crypto from "crypto-js";
import {Response} from "superagent";
import {ActionError} from "../dispatcher/dispatcher";
import {DispatcherRemoveDatabase, IRemoveDatabase, IRemoveDatabaseResponse}
    from "../actions/databaseActionCreator";

/**
 * <p>This class represents the APIs used by {DatabaseActionCreator}.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class DatabaseAPIs {
    /**
     * @description
     * <p>This method send a request to remove a database
     * from the backend of MaaS.</p>
     * @param data {IRemoveDatabase}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public login(data : IRemoveDatabase) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObj : IRemoveDatabaseResponse) => void,
                reject : (err : Object) => void) : void {
                request
                    .delete("/companies/" + data.id_company
                        + "/database/" + data.id_database)
                    .set("Content-Type", "application/json")
                    .end(function(error : Object, res : Response) : void{
                        if (error) {
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            let response : IRemoveDatabaseResponse = res.body;
                            resolve(response);
                        }
                    });
            });
    }
}

let databaseAPIs : DatabaseAPIs = new DatabaseAPIs();
export default databaseAPIs;
