import * as express from "express";
import {UserDocument} from "../models/userModel";
import {RequestHandler} from "express-serve-static-core";
/**
 * This class checks the level of the user from the request
 *
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * |   Luca Bianco   | Create class     | 07/05/2016     |
 *
 * @author Luca Bianco
 * @license MIT
 *
 */

export  class LevelChecker {
    /**
     * @description <p>Method to check the level of the user. It allows to
     * check if the current user is allowed to do the invoked operation.</p>
     * @param {Array<string>} levelsAllowed
     * Array of allowed levels
     * @returns {RequestHandler} The middleware to use to check the level
     */
    public static check(levelsAllowed : Array<string>) : RequestHandler {
        return function (request : express.Request,
                         response : express.Response,
                         next : express.NextFunction ) : void {
            let user : UserDocument = request.user || undefined;

            if (!user) { // There's no user to check
                LevelChecker.accessDenied(response);
            } else {
                if (levelsAllowed.indexOf(user.level) >= 0) {
                    // Level is inside of allowed so go to next middleware
                    next();
                } else {
                    LevelChecker.accessDenied(response);
                }
            }
        }
    }

    /**
     * @description <p>Method to check the level of the user. It allows to
     * check if the current user is allowed to do the invoked operation.
     * It check also if the user doing the request is the same target user</p>
     * @param {Array<string>} levelsAllowed
     * Array of allowed levels
     * @returns {RequestHandler} The middleware to use to check the level
     */
    public static checkWithMe(levelsAllowed : Array<string>) : RequestHandler {
        return function (request : express.Request,
                         response : express.Response,
                         next : express.NextFunction ) : void {
            let user : UserDocument = request.user || undefined;
            let userID : string = undefined;
            let userIDParam : string = request.params.user_id;

            if (!user) { // There's no user to check
                LevelChecker.accessDenied(response);
            } else {
                userID = user._id;
                if (levelsAllowed.indexOf(user.level) >= 0) {
                    // Level is inside of allowed so go to next middleware
                    next();
                } else {
                    if ( userID == userIDParam) {
                        // The users is the same
                        next();
                    } else {
                        LevelChecker.accessDenied(response);
                    }
                }
            }
        }
    }

    /**
     * @description This is a middleware to check the level of an user. This
     * check is skipped if the id of the user is the same that is defined on the
     * request.
     * @param {Array<string>} levelsAllowed
     * Array of allowed levels
     * @returns {RequestHandler} The middleware to use to check the level
     */
    public static checkWithIDSkip
    (levelsAllowed : Array<string>) : RequestHandler {
        return function(request : express.Request,
                        response : express.Response,
                        next : express.NextFunction) : void  {
            if (request.params.user_id == request.user._id) {
                next();
            } else {
                LevelChecker.check(levelsAllowed);
            }
        }
    }

    /**
     * @description
     * Create a parametrized response for the access denied situation.
     * @param response The generated response with an error message which
     * represents the "access denied" situation.
     */
    private static accessDenied(response : express.Response) : void {
        response.status(400);
        response.json({
            code: "EAH-003",
            message: "User level unauthorized"
        });
    }
}

export default LevelChecker;
