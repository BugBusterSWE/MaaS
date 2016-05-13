import * as express from "express";import UserModel from "../models/userModel";import AuthenticationChecker from "../lib/authenticationChecker";import LevelChecker from "../lib/levelChecker";/** * This class contains endpoint definition about users. * * @history * | Author | Action Performed | Data | * | ---    | ---              | ---  | * | Emanuele Carraro | Create class DSLRouter | 10/05/2016 | * * @author Emanuele Carraro * @license MIT * */class UserRouter {    /**     *  * @description Express router.     */    private router : express.Router;    /**     * @description User's model.     */    private userModel : UserModel;    /**     * @description Authentication checker.     */    private authCheck : AuthenticationChecker;    /**     * @description Level checker     * @type {LevelChecker}     */    private checkOwner : LevelChecker;    /**     * @description Complete constructor. Here we initialize user's routes.     */    constructor() {        this.router = express.Router();        this.userModel = new UserModel();        this.authCheck = new AuthenticationChecker();        this.checkOwner = new LevelChecker( ["OWNER", "SUPERADMIN"]);        this.router.get(            "/companies/:company_id/users",            this.checkOwner.check,            this.getAllUsers);        this.router.get(            "/companies/:company_id/users/:user_id",            this.getOneUser);        // FIXME: che tipo di check deve essere fatto qui?        this.router.post(            "/users/:user_id",            this.createUser);        this.router.put(            "/companies/:companies_id/users/:user_id",            this.checkOwner.checkWithIDSkip,            this.updateUser);        this.router.delete(            "/companies/:companies_id/users/:user_id",            this.checkOwner.checkWithIDSkip,            this.removeUser);    }    /**     * @description Return the Express router.     * @returns {express.Router} The Express router.     */    public getRouter() : express.Router {        return this.router;    }    /**     * @description Perform the user's login.     * @param request The express request.     * <a href="http://expressjs.com/en/api.html#req">See</a> the official     * documentation for more details.     * @param response The express response object.     * <a href="http://expressjs.com/en/api.html#res">See</a> the official     * documentation for more details.     */    private login(request : express.Request,                  response : express.Response) : void {        this.authCheck            .login(request, response)            .then(function (data : Object) : void {                response                    .status(200)                    .json(data);            }, function (error : Error) : void {                response                    .status(404)                    .json({                        done: false,                        message: "Cannot login"                    });            });    }    /**     * @description Get the user represented by the id contained in     * the request.     * @param request The express request.     * <a href="http://expressjs.com/en/api.html#req">See</a> the official     * documentation for more details.     * @param response The express response object.     * <a href="http://expressjs.com/en/api.html#res">See</a> the official     * documentation for more details.     */    private getOneUser(request : express.Request,                       response : express.Response) : void {        this.userModel            .getOne(request.params.user_id)            .then(function (data : Object) : void {                response                    .status(200)                    .json(data);            }, function (error : Error) : void {                response                    .status(404)                    .json({                        done: false,                        message: "Cannot find the requested user"                    });            });    }    /**     * @description Get all the users.     * @param request The express request.     * <a href="http://expressjs.com/en/api.html#req">See</a> the official     * documentation for more details.     * @param response The express response object.     * <a href="http://expressjs.com/en/api.html#res">See</a> the official     * documentation for more details.     */    private getAllUsers(request : express.Request,                        response : express.Response) : void {        this.userModel            .getAll()            .then(function (data : Object) : void {                response                    .status(200)                    .json(data);            }, function (error : Object) : void {                response                    .status(404)                    .json({                        done: false,                        message: "Cannot find the user"                    });            });    }    /**     * @description Update the user represented by the id contained in     * the request.     * @param request The express request.     * <a href="http://expressjs.com/en/api.html#req">See</a> the official     * documentation for more details.     * @param response The express response object.     * <a href="http://expressjs.com/en/api.html#res">See</a> the official     * documentation for more details.     */    private updateUser(request : express.Request,                       response : express.Response) : void {        this.userModel            .update(request.params.user_id, request.body)            .then(function (data : Object) : void {                response                    .status(200)                    .json(data);            }, function (error : Object) : void {                response                // Todo : set the status                    .status(404)                    .json({                        done: false,                        message: "Cannot modify the user"                    });            });    }    /**     * @description Remove the user represented by the id contained in     * the request.     * @param request The express request.     * <a href="http://expressjs.com/en/api.html#req">See</a> the official     * documentation for more details.     * @param response The express response object.     * <a href="http://expressjs.com/en/api.html#res">See</a> the official     * documentation for more details.     */    private removeUser(request : express.Request,                       response : express.Response) : void {        this.userModel            .remove(request.params.user_id)            .then(function (data : Object) : void {                response                    .status(200)                    .json(data);            }, function (error : Object) : void {                response                // Todo : set the status                    .status(404)                    .json({                        done: false,                        message: "Cannot remove the user"                    });            });    }    /**     * @description Create a new user.     * @param request The express request.     * <a href="http://expressjs.com/en/api.html#req">See</a> the official     * documentation for more details.     * @param response The express response object.     * <a href="http://expressjs.com/en/api.html#res">See</a> the official     * documentation for more details.     */    private createUser(request : express.Request,                       response : express.Response) : void {        this.userModel            .create(request.body)            .then(function (data : Object) : void {                response                    .status(200)                    .json(data);            }, function (error : Object) : void {                response                // Todo : set the status                    .status(404)                    .json({                        done: false,                        message: "Cannot create the user"                    });            });    }}export default UserRouter;