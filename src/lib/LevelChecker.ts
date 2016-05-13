import * as express from "express";
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

export default class LevelChecker {

    private levelsAllowed : Array<String>;

    constructor (levelsAllowed : Array<String>) {
        this.levelsAllowed = levelsAllowed;
    }

    /**
     * @description method to check the level of the user if is allowed
     *
     * @param request
     * @param response
     * @param next
     */
    public check(
        request : express.Request,
        response : express.Response,
        next : express.NextFunction) : void {

        let user : Object = request.user || undefined;

        if ( !user ) {
            this.accessDenied(response);
        } else {
            if ( this.levelsAllowed.indexOf(user.level) ) {
                // Level is inside of allowed so go to next middleware
                next();
            } else {
                this.accessDenied(response);
            }
        }
    }

    /**
     * @description this is a middleware to check the level of account
     * and skipping this check if the id of the user is the same with that is
     * defined on the request
     *
     * @param request
     * @param response
     * @param next
     */
    public checkWithIDSkip(
        request : express.Request,
        response : express.Response,
        next : express.NextFunction) : void {
        if (request.params.user_id == request.user._id ) {
            next();
        } else {
            this.check(request, response, next);
        }
    }

    private accessDenied(response) : void {
        response.status(400);
        response.json({
            done: false,
            message: "Unauthorized"
        });
    }
}
