import * as request from "superagent";
import {Response} from "superagent";
import {ILoginResponse} from "../actions/sessionActionCreator";
import {ActionError} from "../dispatcher/dispatcher";

/**
 * <p>This class represents the APIs used by {SessionActionCreator}.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class SessionAPIs {

    /**
     * @description This method send a request of login to the backend of MaaS.
     * @param email {string} Email of the user
     * @param password {string} Password of the user
     * @returns {Promise<T>|Promise} The result or the error
     */
    public login(email : string, password : string) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObj : ILoginResponse) => void,
                reject : (err : Object) => void) : void {
                request.post("/api/login")
                .send({email : email, password : password,
                    grant_type : "password"})
                .set("Content-Type", "application/json")
                .end(function(error : Object, res : Response) : void{
                    if (error) {
                        let actionError : ActionError = res.body;
                        reject(actionError);
                    } else {
                        let loginResponse : ILoginResponse = res.body;
                        resolve(loginResponse);
                    }
                });
        });
    }
}

let sessionAPIs : SessionAPIs = new SessionAPIs();
export default sessionAPIs;
