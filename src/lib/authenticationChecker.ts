import * as jwt from "jsonwebtoken";
import {user, UserDocument} from "../models/userModel";
import * as express from "express";

/**
 * TokenResponse is a interface that represent the response to give
 * when an user authenticates the access.
 *
 * @history
 * | Author         | Action Performed | Data       |
 * | ---            | ---              | ---        |
 * | Luca Bianco    | Create interface | 05/06/2016 |
 *
 * @author Luca Bianco
 * @copyright MIT
 */
interface TokenResponse {
    /**
     * @description contains the user data of authenticated user
     */
    data : Object;

    /**
     * @description date for token to expire
     */
    expireTime : Date;
}

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
     * @description Server's secret string, used to encode the JWT tokens.
     */
    private static secret : string = "this is a secret";

    /**
     * @description Request expire time. By default it is a week (in minutes).
     */
    private static DEFAULT_EXPIRE_TIME : number = 60 * 24 * 7;

    /**
     * @description <p> Default name of the 'username' field in authentication
     * request.</p>
     */
    private USERNAME_BODY_FIELD : string = "email";

    /**
     * @description <p> Default name of the 'password' field in authentication
     * request.</p>
     */
    private PASSWORD_BODY_FIELD : string = "password";

    /**
     * @description Method to perform the login to the service for the user.
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
            .login(username, password)
            .then(function (user : UserDocument) : void {
                if (!user) {
                    AuthenticationChecker.loginFailed(response);
                } else {
                    let userToken : string =
                        AuthenticationChecker.createToken(user);

                    // Returns the user token and the user's main data
                    response.status(200);
                    response.json({
                        token: userToken,
                        user_id: user._id,
                        email: user.email,
                        level: user.level,
                        company: user.company
                    });
                }
            }, function (error : {code : string, message : string}) : void {
                response
                    .status(400)
                    .json(error);
            })
    }

    /**
     * @description Method to authenticate an user by decoding his token.
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

        // Token not found
        if (!token) {
            AuthenticationChecker.responseTokenNotFound(response);
        } else {
            jwt.verify(token, AuthenticationChecker.secret,
                function (err : Error, decoded : TokenResponse) : void {
                    if (err) {

                        // Authentication failed
                        AuthenticationChecker
                            .responseAuthenticationFailed(response);
                    } else {

                        // Success
                        request.user = decoded.data;
                        console.log(request.user);
                        next();
                    }
                });
        }
    }

    /**
     * @description Create the JWT token  by passing the user's data.
     * @param user User's data.
     * @returns {string} A string which represents the JWT token created.
     */
    private static createToken(user : UserDocument) : string {
        return jwt.sign(
            {
                data: user,
                expireTime: AuthenticationChecker.DEFAULT_EXPIRE_TIME
            },
            AuthenticationChecker.secret);
    }

    /**
     * @description 
     * Method to return a default response when token is not found.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private static responseTokenNotFound(response : express.Response) : void {
        response.status(403);
        response.json({
            done: false,
            message: "Authentication failed. No Token Found"
        });
    }

    /**
     * @description
     * Method to return a default response when the authentication fails.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private static responseAuthenticationFailed
    (response : express.Response) : void {
        response.status(403);
        response.json({
            code: "EAH-005",
            message: "Token Invalid. Authentication Failed"
        });
    }

    /**
     * @description
     * Method to return a default response when the login fails.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private static loginFailed(response : express.Response) : void {
        response.status(401);
        response.json({
            code: "EAH-002",
            message: "Login Failed"
        });
    }
}

export const authenticator : AuthenticationChecker =
    new AuthenticationChecker();

