import * as request from "superagent";
import {Response} from "superagent";
import {ILoginResponse} from "../actions/sessionActionCreator";
import {ActionError} from "../dispatcher/dispatcher";

class SessionAPIs {

    // TODO: rimuovere console.log
    public login(email : string, password : string) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObj : Object) => void,
                reject : (err : Object) => void) : void {
                request.post("/api/login")
                .send({email : email, password : password,
                    grant_type : "password"})
                .set("Content-Type", "application/json")
                .end(function(error : Object, res : Response) : void{
                    if (error) {
                        console.log("Error: " + JSON.stringify(error));
                        let actionError : ActionError = res.body;
                        reject(actionError);
                    } else {
                        console.log("No Error: " + JSON.stringify(res));
                        let loginResponse : ILoginResponse = res.body;
                        resolve(loginResponse);
                    }
                });
        });
    }
}

let sessionAPIs : SessionAPIs = new SessionAPIs();
export default sessionAPIs;
