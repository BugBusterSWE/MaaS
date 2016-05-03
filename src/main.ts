/**
 * Created by davide on 26/03/16.
 */


/* tslint:disable */
/**
 * @api {get} /user/:id Read data of a User
 * @apiVersion 0.2.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission user
 *
 * @apiDescription Compare Verison 0.3.0 with 0.2.0 and you will see the green
 * markers with new items in version 0.3.0 and red markers with removed items
 * since 0.2.0.
 *
 * @apiParam {Number} id The Users-ID.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/user/4711
 *
 * @apiSuccess {Number}   id            The Users-ID.
 * @apiSuccess {Date}     registered    Registration Date.
 * @apiSuccess {Date}     name          Fullname of the User.
 * @apiSuccess {String[]} nicknames     List of Users nicknames (Array of Strings).
 * @apiSuccess {Object}   profile       Profile data (example for an Object)
 * @apiSuccess {Number}   profile.age   Users age.
 * @apiSuccess {String}   profile.image Avatar-Image.
 * @apiSuccess {Object[]} options       List of Users options (Array of Objects).
 * @apiSuccess {String}   options.name  Option Name.
 * @apiSuccess {String}   options.value Option Value.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */

/**
 *
 * A short information
 * @param s {string} Cosa vuoi
 * @return {string} Il ritorno
 * 
 */
/* tslint:enable */
export function HelloWorld( s : string ) : string {
    console.log("Hello World");
    return "Hello";
}
