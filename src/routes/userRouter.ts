import * as express from "express";
import {UserModel} from "../models/userModel";

/**
 * This class contains endpoint definition about companies.
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Emanuele Carraro | Create class DSLRouter | 10/05/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 *
 */
export default class UserRouter {

    private router : express.Router = express.Router();
    private userModel = new UserModel();

    constructor() {
        this.router.get(
            "/users",
            this.getAllUsers);
        this.router.get(
            "/users/:user_id",
            this.getOneUser);
        this.router.post(
            "/users/:user_id",
            this.createUser);
        this.router.put(
            "/users/:user_id",
            this.updateUser);
        this.router.delete(
            "/users/:user_id",
            this.removeUser);
    }

    public getRouter() : express.Router {
        return this.router;
    }

    private getOneUser(request : express.Request,
                           response : express.Response) : void {
        this.userModel
            .getOne(request.params.user_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot find the request dsl"
                    });
            });
    }

    private getAllUsers(request : express.Request,
                            response : express.Response) : void {
        this.userModel
            .getAll()
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot find the dsl"
                    });
            });
    }


    private updateUser(request : express.Request,
                           response : express.Response) : void {
        this.userModel
            .update(request.params.user_id, request.body)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                // Todo : set the status
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot modify the dsl"
                    });
            });
    }

    private removeUser(request : express.Request,
                           response : express.Response) : void {
        this.userModel
            .remove(request.params.user_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                // Todo : set the status
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot remove the databases"
                    });
            });
    }


    private createUser(request : express.Request,
                           response : express.Response) : void {
        this.userModel
            .create(request.body)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Object) : void {
                response
                // Todo : set the status
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot create the databases"
                    });
            });
    }
}

