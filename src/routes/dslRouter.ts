import * as express from "express";
import DSLModel from "../models/dslModel";
import LevelChecker from "../lib/levelChecker";
/**
 * This class contains endpoint definition about DSLs.
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
class DSLRouter {

    /**
     * @description Express router.
     */
    private router : express.Router;

    /**
     * @description Level checker.
     */
    private checkMember : LevelChecker;


    /**
     * @description DSL' model.
     */
    private dslModel : DSLModel;

    /**
     * @description Complete constructor.
     */
    constructor() {

        this.router = express.Router();
        this.dslModel = new DSLModel();
        this.checkMember = new LevelChecker(
            ["MEMBER", "ADMIN", "OWNER", "SUPERADMIN"]);

        this.router.get(
            "/companies/:company_id/dsl",
            this.getAllDSL);
        this.router.get(
            "/companies/:company_id/DSLs/:dsl_id",
            this.checkMember.check,
            this.getOneDSL);
        this.router.post(
            "/companies/:company_id/DSLs/",
            this.checkMember.check,
            this.createDSL);
        this.router.put(
            "/companies/:company_id/DSLs/:dsl_id",
            this.checkMember.check,
            this.updateDSL);
        this.router.delete(
            "/companies/:company_id/DSLs/:dsl_id",
            this.checkMember.check,
            this.removeDSL);
    }

    /**
     * @description Return the Express router.
     * @returns {express.Router} The Express router.
     */
    public getRouter() : express.Router {
        return this.router;
    }

    /**
     * @description Get the DSL represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
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
                        message: "Cannot find the requested DSL"
                    });
            });
    }

    /**
     * @description Get the database represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getAllDSL(request : express.Request,
                      response : express.Response) : void {
        this.dslModel
            .getAll()
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function (error : Error) : void {
                response
                    .status(404)
                    .json({
                        done: false,
                        message: "Cannot find the DSLs"
                    });
            });
    }

    /**
     * @description Update the dsl represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
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

    /**
     * @description Remove the dsl represented by the id contained in
     * the request.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
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

    /**
     * @description Create a new DSL.
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param response The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
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

export default DSLRouter;
