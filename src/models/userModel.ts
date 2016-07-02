import * as mongoose from "mongoose";
import * as crypto from "crypto";
import Model from "./model";
import CustomModel from "./customModelInterface";

/**
 * This is the model to represent users in MaaS. Extends model class.
 *
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Luca Bianco     | Create class     | 07/05/2016     |
 *
 * @author Luca Bianco
 * @license MIT
 */

export interface UserDocument extends CustomModel {
    _id : string;
    /**
     * @description The user's username.
     */
    email : string;


    /**
     * @description virtual field to store the password before hasing
     */
    password : string;

    /**
     * @description The user's hashed password.
     */
    passwordHashed : string;

    /**
     * @description The user's salt password.
     */
    passwordSalt : string;

    /**
     * @description The user's password iteration.
     */
    passwordIterations : number;

    /**
     * @description The user's level.
     */
    level : string;

    company : string;

    /**
     * Document method to authenticate the user
     * @param password
     */
    authenticate : (password : string) => boolean;
}

/**
 * description This class represents the user model.
 */
export class UserModel extends Model {
    /**
     * @description Default number of password iterations.
     */
    private static PWD_DEFAULT_ITERATIONS : number = 1000;

    /**
     * Default password length.
     */
    private static PWD_LENGTH : number = 50;

    /**
     * Array which represents the user's levels.
     * @type {string[]}
     */
    private static USER_TYPES : Array<string> = [
        "GUEST",
        "MEMBER",
        "ADMIN",
        "OWNER",
        "SUPERADMIN"
    ];

    /**
     * @description Default constructor.
     */
    constructor() {
        super();
    }

    /**
     * @description
     * <p>Login method. Data are taken from the model, that search for only
     * one match in the database. If the user is not found a error is returned,
     * otherwise the password of the user is checked and if is ok then
     * resolve(data) is called.</p>
     * @param {string} email User's email.
     * @param {string} password USer's password.
     * @returns {Promise<Object>|Promise} <p> Promise generated by the
     * mongoose's query. </p>
     */
    public login(email : string, password : string) : Promise < Object > {
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            this.model.findOne({email: email},
                (error : Object, data : UserDocument) => {
                    if (error) {
                        reject({
                            code: "ESM-000",
                            message: "Database error"
                        });
                    } else {
                        if (!data) {
                            reject({
                                code: "EAH-000",
                                message: "User not found"
                            })
                        } else {
                            if (data.authenticate(password)) {
                                resolve(data);
                            } else {
                                reject({
                                    code: "EAH-001",
                                    message: "Invalid password"
                                });
                            }
                        }
                    }
                })
        });
    }

    /**
     * @description
     * <p> It creates a new user. It overrides the model.create method to return
     * the user without password informations</p>
     * @param jsonData
     */
    public create(jsonData : Object) : Promise<Object> {
        let userPromise : Promise<Object> = super.create(jsonData);
        return new Promise(
            function (resolve : (data : Object) => void,
                      reject : (error : Object) => void) : void {
                userPromise
                    .then((user : UserDocument) => {
                        user.passwordHashed = undefined;
                        user.passwordIterations = undefined;
                        user.passwordSalt = undefined;
                        resolve(user);
                    }, (error : Object) => {
                        reject(error);
                    });
            });
    }

    /**
     *
     * @description
     * <p>Create a superAdmin. This method call his father with method.</p>
     * @param jsonData
     * @returns {Promise<Object>}
     *
     */
    public addSuperAdmin(jsonData : Object) : Promise<Object> {
        jsonData["level"] = "SUPERADMIN";
        return this.create(jsonData);
    }

    /**
     * @description Set the new Credentials only if old credentials are good
     * @param {string} username old user's username
     * @param {string} password old user's password
     * @param {string} newUsername new user's username
     * @param {string} newPassword new user's password
     * @returns {Promise<Object>|Promise}
     */
    public setCredentials(username : string,
                          password : string,
                          newUsername : string,
                          newPassword : string) : Promise<Object> {
        return new Promise(
            function (resolve : (data : Object) => void,
                      reject : (error : Object) => void) : void {
                this
                    .login(username, password)
                    .then((user : UserDocument) => {
                        user.email = newUsername;
                        user.password = newPassword;

                        user.save((error : Object, data : Object) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(data);
                            }
                        })
                    })
            });
    }

    /**
     * @description Get the element represented by the _id ID.
     * @param {string} _id The ID of the element.
     * @returns {Promise<Object>|Promise} Promise generated by the mongoose's
     * query.
     */
    public getOne(_id : string) : Promise < Object > {
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            this.model.findOne({_id: _id},
                {
                    passwordHashed: false,
                    passwordSalt: false,
                    passwordIterations: false
                },
                (error : Object, data : Object) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
        })
    }

    /**
     * @description Get all the element of a collection.
     * @returns {Promise<Object>|Promise} Promise generated by the mongoose's
     * query.
     */
    public getAll() : Promise < Object > {
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            this.model.find({},
                {
                    passwordHashed: false,
                    passwordSalt: false,
                    passwordIterations: false
                },
                (error : Object, data : Object) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                })
        });
    }

    /**
     * @description <p>Checks if the user represented by his id is inside
     * the company specified with companyID</p>
     * @param {string} userID
     * @param {string} companyID
     * @returns {Promise<Object>|Promise} <p> The promise is resolved with
     * with a boolean value that means if an user is inside the company
     * specified or not. In case of reject, the promise returns the error
     * generated by mongoose </p>
     */
    public checkUserCompany
    (userID : string, companyID : string) : Promise<Object> {
        return new Promise((resolve : (data : boolean) => void,
                            reject : (error : Object) => void) => {
            this.model.find(
                {_id: userID, company: companyID},
                (error : Object, numberOfUsers : number) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(numberOfUsers > 0);
                    }
                });
        });
    }

    /**
     * @description Get all the users for a specific company
     * @param {string} company
     * It's a company id
     * @returns {Promise<Object>|Promise} <p> Promise that is resolved with
     * user array or rejected with the error generated from mongoose.</p>
     */
    public getAllForCompany(company : string) : Promise < Object > {
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            this.model.find({company},
                {
                    passwordHashed: false,
                    passwordSalt: false,
                    passwordIterations: false
                },
                (error : Object, data : Object) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                })
        });
    }

    /**
     * @description Get all the users for a specific role
     * @param {string} role
     * It's the role to search
     * @returns {Promise<Object>|Promise} <p> Promise that is resolved with
     * user array or rejected with the error generated from mongoose.</p>
     */
    public getAllForRole( role : string) : Promise<Object> {
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            this.model.find({level : role},
                {
                    passwordHashed: false,
                    passwordSalt: false,
                    passwordIterations: false
                },
                (error : Object, data : Object) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                })
        });
    }

    /**
     * @description Return the user's model.
     * @returns {Model<DatabaseDocument>} The model.
     * @override
     */
    protected getModel() : mongoose.Model < UserDocument > {
        return this
            .getConnection()
            .model<UserDocument>("User", this.getSchema());
    }

    /**
     * @description Return the user's model.
     * @returns {Schema<DatabaseDocument>} The model.
     * @override
     */
    protected getSchema() : mongoose.Schema {
        let schema : mongoose.Schema = new mongoose.Schema({
            email: {
                type: String,
                required: true,
                sparse: true,
                unique: true
            },
            passwordHashed: {
                type: String,
                required: true
            },
            passwordSalt: {
                type: String,
                required: true
            },
            passwordIterations: {
                type: Number,
                default: UserModel.PWD_DEFAULT_ITERATIONS
            },
            level: {
                type: String,
                required: true,
                enum: UserModel.USER_TYPES,
                default: UserModel.USER_TYPES[0]
            },
            company: {
                type: mongoose.Schema.Types.ObjectId
            }
        });

        schema.virtual("password")
            .set(function (password : string) : void {
                this._password = password;
                this.passwordSalt = this.generateSalt();
                this.passwordHashed = this.hashPassword(this._password);
            })
            .get(function () : string {
                return this._password;
            });

        this.setSchemaMethods(schema);

        return schema;
    }

    /**
     * @description Set the methods of the user's schema.
     * @param schema The user's schema.
     */
    private setSchemaMethods(schema : mongoose.Schema) : void {
        schema.method(
            "authenticate",
            function (passwordText : string) : boolean {
                return this.hashPassword(passwordText) == this.passwordHashed;
            });
        schema.method(
            "generateSalt",
            function () : string {
                return crypto.randomBytes(16).toString("base64");
            });
        schema.method(
            "hashPassword",
            function (password : string) : string {
                return crypto
                    .pbkdf2Sync(password,
                        this.passwordSalt,
                        this.passwordIterations,
                        UserModel.PWD_LENGTH)
                    .toString("base64");
            });
    }
}

export const user : UserModel = new UserModel();
