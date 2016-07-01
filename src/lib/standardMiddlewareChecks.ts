import {LevelChecker} from "./levelChecker";
import {RequestHandler} from "express-serve-static-core";
import * as express from "express";
import {UserDocument, user} from "../models/userModel";

/**
 * @description Checker for levels above the admin
 * @type {RequestHandler}
 */
export let checkAdmin : RequestHandler =
    LevelChecker.check(["ADMIN", "OWNER", "SUPERADMIN"]);

/**
 * @description Checker for levels above the owner
 * @type {RequestHandler}
 */
export let checkOwner : RequestHandler =
    LevelChecker.check(["OWNER", "SUPERADMIN"]);

export let checOwnerOrMe : RequestHandler = 
    LevelChecker.checkWithMe(["OWNER", "SUPERADMIN"]);

/**
 * @description Checker for levels above the member
 * @type {RequestHandler}
 */
export let checkMember : RequestHandler =
    LevelChecker.check(["MEMBER", "ADMIN", "OWNER", "SUPERADMIN"]);

/**
 * @description Checker for SperAdmin level
 * @type {RequestHandler}
 */
export let checkSuperAdmin : RequestHandler =
    LevelChecker.check(["SUPERADMIN"]);

/**
 * @description <p> Checker for level above admin with the skip
 * if the user that require the method is the directed owner of the 
 * resource </p>
 * @type {RequestHandler}
 */
export let checkAdminWithIDSkip : RequestHandler =
    LevelChecker.checkWithIDSkip(["ADMIN", "OWNER", "SUPERADMIN"]);

/**
 * @description <p> Checker for level above owner with the skip
 * if the user that require the method is the directed owner of the
 * resource </p>
 * @type {RequestHandler}
 */
export let checkOwnerWithIDSkip : RequestHandler =
    LevelChecker.checkWithIDSkip(["OWNER", "SUPERADMIN"]);

/**
 * @description <p> Checker for level above member with the skip
 * if the user that require the method is the directed owner of the
 * resource </p>
 * @type {RequestHandler}
 */
export let checkMemberWithIDSkip : RequestHandler =
    LevelChecker.checkWithIDSkip(["MEMBER", "ADMIN", "OWNER", "SUPERADMIN"]);

/**
 * @description checks if the user is inside the company required
 * @param {express.Request} request 
 * Basic request for middleware
 * @param {express.Response} response
 * Basic response for middleware
 * @param {express.NextFunction} next
 * Express hook for the next middleware
 */
export let checkInsideCompany : RequestHandler =
    function (request : express.Request,
              response : express.Response,
              next : express.NextFunction) : void {
        let userData : UserDocument = request.user;
        let companyID : string = request.params.company_id;

        if (userData.level === "SUPERADMIN") {
            next();
        } else {
            user
                .checkUserCompany(userData._id, companyID)
                .then((isValid : boolean) => {
                    if (isValid) {
                        next();
                    } else {
                        response
                            .status(401)
                            .json({
                                code: "EAH-004",
                                message: "Not Allowed to use this company"
                            });
                    }
                }, (error : Object) => {
                    response
                        .status(500)
                        .json({
                            code: "ESM-000",
                            message: "Error to get the user from the database"
                        });
                });
        }
    };

