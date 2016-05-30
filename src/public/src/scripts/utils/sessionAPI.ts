import ServerActionCreators from "../actions/serverActionCreator";
import * as request from "superagent";
import {Response} from "superagent";

class SessionAPIs {

    login(email : string, password : string) : Promise<Object> {
        return new Promise(
            function(
                resolve : (jsonObj : Object) => void,
                reject : (err : Object) => void) : void {
                request.post("https://127.0.0.1:3000/api/login")
                .send({email : email, password : password,
                    grant_type : "password"})
                .set("Content-Type", "application/json")
                .end(function(error : Object, res : Response) : void{
                    console.log(res);
                    console.log(JSON.stringify(res));
                    let JsonObject : Object = JSON.parse(res.text);
                    if (error) {
                        console.log(JsonObject);
                        reject(error);
                    } else {
                        console.log(JsonObject);
                        resolve(JsonObject);
                    }
                });
        });
    }
}

let sessionAPIs : SessionAPIs = new SessionAPIs();
export default sessionAPIs;
