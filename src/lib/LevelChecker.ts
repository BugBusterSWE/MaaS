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

    private levelsAllowed : Array<String>;

    constructor (levelsAllowed : Array<String>) {
        this.levelsAllowed = levelsAllowed;
    }

    public check(request, response, next ) : void {

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

    private accessDenied(response) : void {
        response.status(400);
        response.json({
            done: false,
            message: "Unauthorized"
        });
    }
}
