import * as jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import * as express from "express";
import ConfigurationChooser from "../config/configurationChooser";
import * as mongoose from "mongoose";
/**
 * This class is used to check the authentication for the requests
 *
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * |   Luca Bianco   | Create class     | 07/05/2016     |
 *
 * @author Luca Bianco
 * @license MIT
 */

export default class AuthenticationChecker {

    private secret : string;

    private DEFAULT_EXPIRE_TIME : number = 60 * 24 * 7;

    private USERNAME_BODY_FIELD : string = "username";
    private PASSWORD_BODY_FIELD : string = "username";

    constructor() {

    }

    public login(request : express.Request,
                 response : express.Response) : void {
        let username : string = request.body[this.USERNAME_BODY_FIELD];
        let password : string = request.body[this.PASSWORD_BODY_FIELD];
        
        // TODO: sistemare inclusione del modello utente
        UserModel
            .login(username, password)
            .then(function (error : Object, user : mongoose.Model<Object>) : void {
                if (error || !user) {
                    this.loginFailed(response);
                } else {
                    let userToken : string = this.createToken(user);
                    response.status(200);
                    response.json({
                        done: true,
                        message: "Authentication done",
                        token: userToken,
                        user_id: user._id
                    });
                }
            })
    }

    public authenticate(
        request : express.Request,
        response : express.Response,
        next : express.NextFunction) : void {
        let token : string = request.body.token ||
            request.query.token ||
            request.headers["x-access-token"];

        if (!token) {
            this.responseTokenNotFound(response);
        } else {
            jwt.verify(token, this.secret, function (err, decoded) {
                if (err) {
                    this.responseAuthenticationFailed(response);
                } else {
                    request.user = decoded;
                    next();
                }
            });
        }
    }

    private createToken(data : Object) : string {
        return jwt.sign(
            {
                data: data,
                expireTime: this.DEFAULT_EXPIRE_TIME
            },
            ConfigurationChooser.getServerSecret()
        );
    }

    private responseTokenNotFound(response : express.Response) : void {
        response.status(403);
        response.json({
            done: false,
            message: "Authentication failed. No Token Found"
        });
    }

    private responseAuthenticationFailed(response : express.Response) : void {
        response.status(403);
        response.json({
            done: false,
            message: "Authentication failed. Token invalid"
        });
    }

    private loginFailed(response : express.Response) : void {
        response.status(401);
        response.json({
            done: false,
            message: "Login Failed"
        });
    }
}
