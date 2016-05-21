import * as jwt from "jsonwebtoken";
import {user, UserDocument} from "../models/userModel";
import * as express from "express";
import ConfigurationChooser from "../config/index";
import * as mongoose from "mongoose";

/**
 * This class is used to check if the current user is correctly authenticate
 * to the MaaS application.
 *
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * |   Luca Bianco   | Create class     | 07/05/2016     |
 *
 * @author Luca Bianco
 * @license MIT
 */

class AuthenticationChecker {
    /**
     * @description Server's secret string, used for encode the JWT tokens.
     */
    private secret : string;

    /**
     * @description Request's expire time. By default it is 60*24*7.
     */
    private static DEFAULT_EXPIRE_TIME : number = 60 * 24 * 7;

    /**
     * @description Default name of the 'username' field in every request.
     */
    private USERNAME_BODY_FIELD : string = "email";

    /**
     * @description Default name of the 'password' field in every request.
     */
    private PASSWORD_BODY_FIELD : string = "password";

    /**
     * @description Login the user.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    public login(request : express.Request,
                 response : express.Response) : void {
        let username : string = request.body[this.USERNAME_BODY_FIELD];
        let password : string = request.body[this.PASSWORD_BODY_FIELD];

        user
            .login(username, password) // Call the login method...
            .then(function (user : UserDocument) : void { // ...when done, let's say it to the client
                if (!user) {
                    this.loginFailed(response);
                } else {
                    let userToken : string =
                        AuthenticationChecker.createToken(user);
                    response.status(200);
                    response.json({
                        done: true,
                        message: "Authentication done",
                        token: userToken,
                        user_id: user["_id"]
                    });
                }
            }, function (error) {
                response.json({error, status: "errore"});
            })
    }

    /**
     * @description Authenticate the user.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     * @param next Function which invokes the next route handler in framework.
     */
    public authenticate(request : express.Request,
                        response : express.Response,
                        next : express.NextFunction) : void {
        let token : string = request.body.token ||
            request.query.token ||
            request.headers["x-access-token"];

        if (!token) { // Token not found
            this.responseTokenNotFound(response);
        } else {
            jwt.verify(token, this.secret,
                function (err : Error, decoded : Object) : void {
                    if (err) { // Authentication failed
                        this.responseAuthenticationFailed(response);
                    } else { // Success!
                        request.user = decoded;
                        next();
                    }
                });
        }
    }

    /**
     * @description Create the JWT token for the current user.
     * @param data User's data.
     * @returns {string} A string which represents the JWT token created.
     */
    private static createToken(data : Object) : string {
        return jwt.sign(
            {
                data: data,
                expireTime: AuthenticationChecker.DEFAULT_EXPIRE_TIME
            },
            ConfigurationChooser.getConfig().getServerSecret());
    }

    /**
     * @descripton
     * Create a parametrized response for the token not found situation.
     * @param response The generated response with an error message which
     * represents the "token not found" situation.
     */
    private responseTokenNotFound(response : express.Response) : void {
        response.status(403);
        response.json({
            done: false,
            message: "Authentication failed. No Token Found"
        });
    }

    /**
     * @description
     * Create a parametrized response for the authentication failed situation.
     * @param response The generated response with an error message which
     * represents the "authentication failed" situation.
     */
    private responseAuthenticationFailed(response : express.Response) : void {
        response.status(403);
        response.json({
            done: false,
            message: "Authentication failed. Token invalid"
        });
    }

    /**
     * @description
     * Create a parametrized response for the login failed situation.
     * @param response The generated response with an error message which
     * represents the "login failed" situation.
     */
    private loginFailed(response : express.Response) : void {
        response.status(401);
        response.json({
            done: false,
            message: "Login Failed"
        });
    }
}

export const authenticator : AuthenticationChecker = new AuthenticationChecker();
