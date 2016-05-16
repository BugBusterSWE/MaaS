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

class LevelChecker {

    /**
     * @description Array which contains all the possible users' levels.
     */
    private levelsAllowed : Array<String>;

    /**
     * @description Complete constructor.
     * @param levelsAllowed An array which contains all the possible users'
     * levels.
     */
    constructor (levelsAllowed : Array<String>) {
        this.levelsAllowed = levelsAllowed;
    }

    /**
     * @description Method to check the level of the user. It allows to
     * check if the current user is allowed to do the invoked operation.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     * @param next Function which invokes the next route handler in framework.
     */
    public check(
        request : express.Request,
        response : express.Response,
        next : express.NextFunction) : void {

        let user : Object = request.user || undefined;

        if ( !user ) { // There's no user to check
            this.accessDenied(response);
        } else {
            if ( this.levelsAllowed.indexOf(user["level"]) ) {
                // Level is inside of allowed so go to next middleware
                next();
            } else {
                this.accessDenied(response);
            }
        }
    }

    /**
     * @description This is a middleware to check the level of an user. This
     * check is skipped if the id of the user is the same that is defined on the
     * request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     * @param next Function which invokes the next route handler in framework.
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

    /**
     * @description 
     * Create a parametrized response for the access denied situation.
     * @param response The generated response with an error message which
     * represents the "access denied" situation.
     */
    private accessDenied(response : express.Response) : void {
        response.status(400);
        response.json({
            done: false,
            message: "Unauthorized"
        });
    }
}

export default LevelChecker;
