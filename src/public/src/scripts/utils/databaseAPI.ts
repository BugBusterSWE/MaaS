import * as request from "superagent";
import * as crypto from "crypto-js";
import {Response} from "superagent";
import {ActionError} from "../dispatcher/dispatcher";
import {DispatcherRemoveDatabase, IRemoveDatabase, IRemoveDatabaseResponse,
    DispatcherAddDatabase, IAddDatabase, IAddDatabaseResponse,
    DispatcherFindDatabase, IFindDatabase, IFindDatabaseResponse,
    DispatcherGetAllDatabase, IGetAllDatabases, IGetAllDatabasesResponse,
    DispatcherUpdateDatabase, IUpdateDatabase, IUpdateDatabaseResponse,
} from "../actions/databaseActionCreator";

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
    public removeDatabase(data : IRemoveDatabase) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObj : IRemoveDatabaseResponse) => void,
                reject : (err : Object) => void) : void {
                request
                    .delete("/api/companies/" + data.id_company
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

    /**
     * @description
     * <p>This method send a request to add a database
     * to the backend of MaaS.</p>
     * @param data {IAddDatabase}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public addDatabase(data : IAddDatabase) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObj : IAddDatabaseResponse) => void,
                reject : (err : Object) => void) : void {
                request
                    .post("/api/companies/" + data.id_company + "/databases")
                    .send(data)
                    .set("Content-Type", "application/json")
                    .end(function(error : Object, res : Response) : void{
                        if (error) {
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            let response : IAddDatabaseResponse = res.body;
                            resolve(response);
                        }
                    });
            });
    }

    /**
     * @description
     * <p>This method send a request to find a database
     * in the backend of MaaS.</p>
     * @param data {IFindDatabase}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public findDatabase(data : IFindDatabase) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObj : IFindDatabaseResponse) => void,
                reject : (err : Object) => void) : void {
                request
                    .get("/api/companies/" + data.id_company +
                        "/databases/" + data.id_database)
                    .set("Content-Type", "application/json")
                    .end(function(error : Object, res : Response) : void{
                        if (error) {
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            let response : IFindDatabaseResponse = res.body;
                            resolve(response);
                        }
                    });
            });
    }

    /**
     * @description
     * <p>This method send a request to get all databases
     * in the backend of MaaS.</p>
     * @param data {IGetAllDatabase}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public getAllDatabases(data : IGetAllDatabases) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObj : IGetAllDatabasesResponse[]) => void,
                reject : (err : Object) => void) : void {
                request
                    .get("/api/companies/" + data.id_company + "/databases")
                    .set("Content-Type", "application/json")
                    .end(function(error : Object, res : Response) : void{
                        if (error) {
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            let response : IGetAllDatabasesResponse[]
                                = res.body;
                            resolve(response);
                        }
                    });
            });
    }


    /**
     * @description
     * <p>This method send a request to update a database
     * in the backend of MaaS.</p>
     * @param data {IUpdateDatabase}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public updateDatabase(data : IUpdateDatabase) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObj : IUpdateDatabaseResponse) => void,
                reject : (err : Object) => void) : void {
                request
                    .get("/api/companies/" + data.id_company +
                        "/database/" + data. id_database)
                    .set("Content-Type", "application/json")
                    .end(function(error : Object, res : Response) : void{
                        if (error) {
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            let response : IUpdateDatabaseResponse = res.body;
                            resolve(response);
                        }
                    });
            });
    }
}

let databaseAPIs : DatabaseAPIs = new DatabaseAPIs();
export default databaseAPIs;
