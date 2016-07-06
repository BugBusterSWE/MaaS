import * as request from "superagent";
import {Response} from "superagent";
import * as crypto from "crypto-js";
import {ActionError} from "../dispatcher/dispatcher";
import {IUpdate
} from "../actions/sessionActionCreator";
import {
    IUserRegistration, IUserRegistrationResponse,
    IRemoveProfile, IRemoveProfileResponse,
    IUpdateUserEmail, IUpdateUserEmailResponse,
    IUpdateUserPassword, IUpdateUserPasswordResponse,
    ISupeAdminCreation, ISuperAdminCreationResponse,
    IRecoveryPassword, IRecoveryPasswordResponse,
    IUpdateUserLevel
} from "../actions/userActionCreator";

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

    /**
     * @description
     * <p>This method send a request of user registration
     * to the backend of MaaS.</p>
     * @param data {IUserRegistration}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public userRegistration(data : IUserRegistration) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObject : IUserRegistrationResponse) => void,
                reject : (error : ActionError) => void) : void {
            request
                .post
                ("/api/companies/" + data.company_id + "/users")
                .set("Accept", "application/json")
                .set("x-access-token", data.token) // TODO token
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

    /**
     * @description
     * <p>This method send a request of super admin registration
     * to the backend of MaaS.</p>
     * @param data {ISupeAdminCreation}
     * @param token {string}
     * @returns {Promise<Object>|Promise} The result or the error
     */
    public superAdminCreation(
      data : ISupeAdminCreation,
      token : string
     ) : Promise<Object> {
        let encript1 : string = crypto.SHA256(
            data.password,
            "BugBusterSwe"
          ).toString();
        data.password = crypto.SHA256(encript1, "MaaS").toString();
        return new Promise(
            function(
                resolve : (jsonObject : ISuperAdminCreationResponse) => void,
                reject : (error : ActionError) => void) : void {
            request
                .post
                ("/api/admin/superadmins")
                .set("Accept", "application/json")
                .set("x-access-token", token)
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

    /**
     * @description
     * <p>This method send a request of the super admin list
     * to the backend of MaaS.</p>
     * @param token {string}
     * @returns {Promise<Object>|Promise} The result or the error
     */
    public superAdminList(token : string) : Promise<Object> {

        return new Promise(function (resolve : (value : Response) => void,
        reject : (error : ActionError) => void) : void {
            request
                .get("/api/admin/superadmins/")
                .set("x-access-token", token)
                .end(function(error : Object, res : Response) : void {
                    if (error) {
                        let actionError : ActionError = res.body;
                        reject(actionError);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }

    /**
     * @description
     * <p>This method send a request of remove profile
     * to the backend of MaaS.</p>
     * @param data {IRemoveProfile}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public removeProfile(data : IRemoveProfile) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObject : IRemoveProfileResponse) => void,
                reject : (error : ActionError) => void) : void {
                request
                    .delete("/api/companies/" + data.company_id
                        + "/users/" + data.user_id)
                    .set("Accept", "application/json")
                    .set("x-access-token", data.token)
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

    /**
     * @description
     * <p>This method send a request of update of email
     * to the backend of MaaS.</p>
     * @param data {IUpdateUserEmail}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public updateUserEmail(data : IUpdateUserEmail) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObject : IUpdate) => void,
                reject : (error : ActionError) => void) : void {
                request
                    .put("/api/companies/" + data.company_id
                        + "/users/"  + data._id)
                    .send(data)
                    .set("Accept", "application/json")
                    .set("x-access-token", data.token)
                    .end(function(error : Object, res : Response) : void {
                        if (error) {
                            console.log("Error: " + JSON.stringify(error));
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            console.log("No Error: " + JSON.stringify(res));
                            let updateUserEmailResponse :
                                IUpdate = res.body;
                            resolve(updateUserEmailResponse);
                        }
                    });
            });
    }

    /**
     * @description
     * <p>This method send a request of update of password
     * to the backend of MaaS.</p>
     * @param data {IUpdateUserPassword}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public updateUserPassword(data : IUpdateUserPassword) : Promise<Object> {
        let encript1NP : string = crypto.SHA256(
            data.newPassword, "BugBusterSwe").toString();
        let encryptedPasswordNP : string = crypto.SHA256(
            encript1NP, "MaaS").toString();
        let encript1OP : string = crypto.SHA256(
            data.password, "BugBusterSwe").toString();
        let encryptedPasswordOP : string = crypto.SHA256(
            encript1OP, "MaaS").toString();
        return new Promise(
            function(
                resolve : (jsonObject : IUpdate) => void,
                reject : (error : ActionError) => void) : void {
                request
                    .put("/api/companies/" + data.company_id + "/users/"
                        + data._id + "/credentials")
                    .send(
                        {   username: data.username,
                            password : encryptedPasswordOP,
                            newUsername: data.newUsername,
                            newPassword: encryptedPasswordNP
                        })
                    .set("Accept", "application/json")
                    .set("x-access-token", data.token)
                    .end(function(error : Object, res : Response) : void {
                        if (error) {
                            console.log("Error: " + JSON.stringify(error));
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            console.log("No Error: " + JSON.stringify(res));
                            let updateUserPasswordResponse :
                                IUpdate = res.body;
                            resolve(updateUserPasswordResponse);
                        }
                    });
            });
    }

    /**
     * @description
     * <p>This method send a request of update of password
     * to the backend of MaaS for the Super Admin.</p>
     * @param data {IUpdateUserPassword}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public updateSuperAdminPassword(data : IUpdateUserPassword
    ) : Promise<Object> {
        let encript1NP : string = crypto.SHA256(
            data.newPassword, "BugBusterSwe").toString();
        let encryptedPasswordNP : string = crypto.SHA256(
            encript1NP, "MaaS").toString();
        let encript1OP : string = crypto.SHA256(
            data.password, "BugBusterSwe").toString();
        let encryptedPasswordOP : string = crypto.SHA256(
            encript1OP, "MaaS").toString();

        console.log("Oggeto " + {   username: data.username,
                password : encryptedPasswordOP,
                newUsername: data.newUsername,
                newPassword: encryptedPasswordNP
            }.toString());
        return new Promise(
            function(
                resolve : (jsonObject : IUpdate) => void,
                reject : (error : ActionError) => void) : void {
                request
                    .put("/api/admin/users/" + data._id + "/credentials")
                    .send(
                        {   username: data.username,
                            password : encryptedPasswordOP,
                            newUsername: data.newUsername,
                            newPassword: encryptedPasswordNP
                        })
                    .set("Accept", "application/json")
                    .set("x-access-token", data.token)
                    .end(function(error : Object, res : Response) : void {
                        if (error) {
                            console.log("Error: " + JSON.stringify(error));
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            console.log("No Error: " + JSON.stringify(res));
                            let updateUserPasswordResponse :
                                IUpdate = res.body;
                            resolve(updateUserPasswordResponse);
                        }
                    });
            });
    }


    /**
     * @description
     * <p>This method send a request of update of level
     * to the backend of MaaS.</p>
     * @param data {IUpdateUserLevel}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public updateUserLevel(data : IUpdateUserLevel) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObject : IUpdate) => void,
                reject : (error : ActionError) => void) : void {
                request
                    .put("/api/companies/" + data.company_id
                        + "/users/"  + data._id)
                    .send(data)
                    .set("Accept", "application/json")
                    .set("x-access-token", data.token)
                    .end(function(error : Object, res : Response) : void {
                        if (error) {
                            console.log("Error: " + JSON.stringify(error));
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            console.log("No Error: " + JSON.stringify(res));
                            let updateUserPasswordResponse :
                                IUpdate = res.body;
                            resolve(updateUserPasswordResponse);
                        }
                    });
            });
    }


    /**
     * @description
     * <p>This method send a request of recovery password
     * to the backend of MaaS.</p>
     * @param data {IRecoveryPassword}
     * @returns {Promise<T>|Promise} The result or the error
     */
    public recoveryPassword(data : IRecoveryPassword) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObject : IRecoveryPasswordResponse) => void,
                reject : (error : ActionError) => void) : void {
                request
                    .post("/api/passwordRecovery")
                    .send(data)
                    .set("Accept", "application/json")
                    .end(function(error : Object, res : Response) : void {
                        if (error) {
                            console.log("Error: " + JSON.stringify(error));
                            let actionError : ActionError = res.body;
                            reject(actionError);
                        } else {
                            console.log("No Error: " + JSON.stringify(res));
                            let recoveryPasswordResponse :
                                IRecoveryPasswordResponse = res.body;
                            resolve(recoveryPasswordResponse);

                        }
                    });
            });
    }
}

let userAPIs : UserAPIs = new UserAPIs();
export default userAPIs;
