import * as request from "superagent";
import {Response} from "superagent";
import {ActionError} from "../dispatcher/dispatcher";
import {IUserRegistration, IUserRegistrationResponse,
    IRemoveProfile, IRemoveProfileResponse}
    from "../actions/userActionCreator";

// TODO: Remove console.log function
/**
 * <p>This class represents the APIs used by {UserActionCreator}.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 15/06/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class UserAPIs {

    public userRegistration(data : IUserRegistration) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObject : IUserRegistrationResponse) => void,
                reject : (error : Object) => void) : void {
            request
                .post
                ("/api/companies/" + data.company_id + "/users")
                .set("Accept", "application/json")
                .set("x-access-token", data.user_id) // TODO token
                .send(data)
                .end(function(error : Object, res : Response) : void {
                    if (error) {
                        console.log("Error: " + JSON.stringify(error));
                        let actionError : ActionError = res.body;
                        reject(actionError);
                    } else {
                        console.log("No Error: " + JSON.stringify(res));
                        let userRegistrationResponse :
                            IUserRegistrationResponse = res.body;
                        resolve(userRegistrationResponse);
                    }
            });
        });
    }

    public removeProfile(data : IRemoveProfile) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObject : IRemoveProfileResponse) => void,
                reject : (error : Object) => void) : void {
                request
                    .delete
                    ("/api/companies/" + data.company_id
                        + "/users/" + data.user_id)
                    .set("Accept", "application/json")
                    .set("x-access-token", data.token) // TODO token
                    .send(data)
                    .end(function(error : Object, res : Response) : void {
                        if (error) {
                            console.log("Error: " + JSON.stringify(error));
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            console.log("No Error: " + JSON.stringify(res));
                            let userRemoveProfile :
                                IRemoveProfileResponse = res.body;
                            resolve(userRemoveProfile);
                        }
                    });
            });
    }
}

let userAPIs : UserAPIs = new UserAPIs();
export default userAPIs;

