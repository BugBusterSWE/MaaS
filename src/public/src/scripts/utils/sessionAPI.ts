import * as request from "superagent";
import {Response} from "superagent";
import {ILoginResponse} from "../actions/sessionActionCreator";

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
                    console.log(res);
                    console.log(JSON.stringify(res));
                    let loginResponse : ILoginResponse = res.body;
                    loginResponse.status = res.status;
                    if (error) {
                        console.log("error: " + loginResponse);
                        reject(error);
                    } else {
                        console.log(loginResponse);
                        resolve(loginResponse);
                    }
                });
        });
    }
}

let sessionAPIs : SessionAPIs = new SessionAPIs();
export default sessionAPIs;
