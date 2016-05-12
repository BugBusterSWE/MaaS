import * as express from "express";
import {DSLModel} from "../models/dslModel";

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
export default class DslRouter {

    private router : express.Router = express.Router();
    private dslModel = new DSLModel();

    constructor() {
        this.router.get(
            "/companies/:company_id/dsl",
            this.getAllDSL);
        this.router.get(
            "/companies/:company_id/dsl/:dsl_id",
            this.getOneDSL);
        this.router.post(
            "/companies/:company_id/dsl",
            this.createDSL);
        this.router.put(
            "/companies/:company_id/dsl/:dsl_id",
            this.updateDSL);
        this.router.delete(
            "/companies/:company_id/dsl/:dsl_id",
            this.removeDSL);
    }

    public getRouter() : express.Router {
        return this.router;
    }

    private getOneDSL(request : express.Request,
                      response : express.Response) : void {
        this.dslModel
            .getOne(request.params.dsl_id)
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

    private getAllDSL(request : express.Request,
                      response : express.Response) : void {
        this.dslModel
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


    private updateDSL(request : express.Request,
                      response : express.Response) : void {
        this.dslModel
            .update(request.params.database_id, request.body)
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

    private removeDSL(request : express.Request,
                      response : express.Response) : void {
        this.dslModel
            .remove(request.params.database_id)
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


    private createDSL(request : express.Request,
                      response : express.Response) : void {
        this.dslModel
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

