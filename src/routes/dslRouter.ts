import * as express from "express";
import {dsl} from "../models/dslModel";
import {authenticator} from "../lib/authenticationChecker";
import {checkInsideCompany,
        checkMember} from "../lib/standardMiddlewareChecks";
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
     * @description Complete constructor.
     */
    constructor() {

        this.router = express.Router();

        this.router.get(
            "/companies/:company_id/DSLs",
            authenticator.authenticate,
            checkInsideCompany,
            this.getAllDSLForCompany);

        this.router.get(
            "/companies/:company_id/DSLs/:dsl_id",
            authenticator.authenticate,
            checkMember,
            checkInsideCompany,
            this.getOneDSL);

        this.router.post(
            "/companies/:company_id/DSLs/",
            authenticator.authenticate,
            checkMember,
            checkInsideCompany,
            this.createDSL);

        this.router.put(
            "/companies/:company_id/DSLs/:dsl_id",
            authenticator.authenticate,
            checkMember,
            checkInsideCompany,
            this.updateDSL);

        this.router.delete(
            "/companies/:company_id/DSLs/:dsl_id",
            authenticator.authenticate,
            checkMember,
            checkInsideCompany,
            this.removeDSL);

        // TODO DSL execution
        // TODO dashboard
    }

    /**
     * @description Return the Express router.
     * @returns {express.Router} The Express router.
     */
    public getRouter() : express.Router {
        return this.router;
    }

    /**
     * @api {get} api/companies/:company_id/DSLs/:dsl_id
     * Get all the DSL specifics accessible from the logged user.
     * @apiVersion 0.1.0
     * @apiName getOneDSL
     * @apiGroup DSL
     * @apiPermission GUEST
     *
     * @apiDescription Use this request to get the code of a stated specific
     * DSL.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/DSLs/6552/
     *
     * @apiSuccess {Number} dsl_id The ID of the specific dsl.
     * @apiSuccess {string} code The code of the specific dsl.
     *
     * @apiError CannotFindTheDSL It was impossible to find the requested
     * specific dsl.
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * company.
     * @apiError NoAccessRight Only authenticated members can access the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       "code": "ECM-002",
     *       "message": "Cannot find the DSL required"
     *     }
     */

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
        dsl
            .getOne(request.params.dsl_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function () : void {
                response
                    .status(400)
                    .json({
                        code: "ECM-002",
                        message: "Cannot find the DSL required"
                    });
            });
    }

    /**
     * @api {get} api/companies/:company_id/DSLs
     * Get all the DSL specifics accessible from the logged user.
     * @apiVersion 0.1.0
     * @apiName getAllDSLForCompany
     * @apiGroup DSL
     * @apiPermission MEMBER
     *
     * @apiDescription Use this request to get all the specific dsls
     * accessible from the logged user.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} user_id The ID of the logged user.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/DSLs/
     *
     * @apiSuccess {JSON[]} dsls Please take note that all the data of the
     * DSLs are returned in an array.
     * @apiSuccess {Number} dsl_id The ID of the specific dsl.
     * @apiSuccess {string} code The code of the specific dsl.
     *
     * @apiError CannotFindTheDSL It was impossible to find the requested
     * specific dsl.
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * company.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 500
     *     {
     *       "code": "ESM-000",
     *       "message": "Cannot find the DSLs"
     *     }
     */

    /**
     * @description Get the dsl for the company
     * @param request The express request.
     * <a href="http://expressjs.com/en/api.html#req">See</a> the official
     * documentation for more details.
     * @param result The express response object.
     * <a href="http://expressjs.com/en/api.html#res">See</a> the official
     * documentation for more details.
     */
    private getAllDSLForCompany(request : express.Request,
                                response : express.Response) : void {
        dsl
            .getAllForCompany(request.params.company_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function () : void {
                response
                    .status(500)
                    .json({
                        code: "ESM-000",
                        message: "Cannot find the DSLs"
                    });
            });
    }

    /**
     * @api {put} api/companies/:company_id/DSLs/:dsl_id
     * Update a stated specific DSL.
     * @apiVersion 0.1.0
     * @apiName updateDSL
     * @apiGroup DSL
     * @apiPermission MEMBER
     *
     * @apiDescription Use this request to update a stated specific DSL.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} user_id The ID of the logged user.
     * @apiParam {Number} dsl_id The ID of the specific DSL.
     * @apiParam {string} code The code of the specific DSL.
     * @apiParam {JSON[]} permits Array which contains all the access
     * permissions to the specific DSL. In particular, each element have two
     * boolean fields, 'write', for writing permits, and 'exec' for the
     * execution permits.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/DSLs/6558/
     *
     * @apiSuccess {Number} id The ID of the specific dsl.
     *
     * @apiError CannotUpdateTheDSL It was impossible to create the specific
     * DSL.
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * company.
     * @apiError NoAccessRight Only authenticated members can access the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       "code": "ECD-001",
     *       "message": "Cannot update the DSL"
     *     }
     */

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
        dsl
            .update(request.params.database_id, request.body)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function () : void {
                response
                    .status(400)
                    .json({
                        code: "ECD-001",
                        message: "Cannot modify the dsl"
                    });
            });
    }

    /**
     * @api {put} api/companies/:company_id/DSLs/:dsl_id
     * Remove a stated specific DSL.
     * @apiVersion 0.1.0
     * @apiName removeDSL
     * @apiGroup DSL
     * @apiPermission MEMBER
     *
     * @apiDescription Use this request to remove a stated specific DSL.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} user_id The ID of the logged user.
     * @apiParam {Number} dsl_id The ID of the specific DSL.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/DSLs/6558/
     *
     * @apiSuccess {Number} id The ID of the specific DSL.
     *
     * @apiError CannotRemoveTheDSL It was impossible to create the specific
     * DSL.
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * company.
     * @apiError NoAccessRight Only authenticated members can access the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404
     *     {
     *       "code": "ECD-002",
     *       "error": "Cannot remove the DSL"
     *     }
     */

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
        dsl
            .remove(request.params.database_id)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function () : void {
                response
                    .status(400)
                    .json({
                        code: "ECD-002",
                        message: "Cannot remove the DSL"
                    });
            });
    }

    /**
     * @api {post} api/companies/:company_id/DSLs
     * Create a new specific DSL.
     * @apiVersion 0.1.0
     * @apiName createDSL
     * @apiGroup DSL
     * @apiPermission MEMBER
     *
     * @apiDescription Use this request to create a new specific DSL.
     *
     * @apiParam {Number} company_id The ID of the Company.
     * @apiParam {Number} user_id The ID of the logged user.
     * @apiParam {string} code The code of the specific DSL.
     *
     * @apiExample Example usage:
     * curl -i http://maas.com/api/companies/1540/DSLs/
     *
     * @apiSuccess {Number} id The ID of the specific dsl.
     *
     * @apiError CannotCreateTheDSL It was impossible to create the specific
     * DSL.
     * @apiError CannotFindTheCompany It was impossible to find the requested
     * company.
     * @apiError NoAccessRight Only authenticated members can access the data.
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 400
     *     {
     *       "code": "ECD-000",
     *       "error": "Cannot create the DSL"
     *     }
     */

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
        dsl
            .create(request.body)
            .then(function (data : Object) : void {
                response
                    .status(200)
                    .json(data);
            }, function () : void {
                response
                    .status(400)
                    .json({
                        code: "EDC-000",
                        message: "Cannot create the DSL"
                    });
            });
    }
}

export default DSLRouter;
