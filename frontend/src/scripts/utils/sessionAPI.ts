import ServerActionCreators from "../actionCreators/serverActionCreator.ts";
import * as request from "superagent";

class SessionAPIs {

    signup(email: string, password: string, passwordConfirmation: boolean) : Promise {

        return new Promise(function(resolve, reject) {
            // Da implementare, richiama serverActionCreators
        })
    }

    login(email: string, password: string) : Promise {

        return new Promise(function(resolve, reject) {
            /*
            request.post('??')
                .send({ username: email, password: password, grant_type: 'password' })
                .set('Accept', 'application/json')
                .end(function(error, res){
                    if (res) {
                        if (res.error) {
                            let errorMsgs = res.getErrors; // _getErrors(res)
                            ServerActionCreators.receiveLogin(null, errorMsgs);
                        } else {
                            let json = JSON.parse(res.text);
                            ServerActionCreators.receiveLogin(json, null);
                        }
                    }
                }); */
        });

    }

}

let sessionAPIs : SessionAPIs = new SessionAPIs();

export default sessionAPIs;