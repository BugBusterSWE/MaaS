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

interface UserDocument extends CustomModel {
    _id : string;
    /**
     * @description The user's username.
     */
    username : string;

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

    authenticate : (password : string) => boolean;
}

/**
 * @description This class represents the user model.
 */
class UserModel extends Model {
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
    private USER_TYPES : Array<string> = [
        "GUEST",
        "MEMBER",
        "ADMIN",
        "OWNER",
        "SUPERADMIN"
    ];

    /**
     * Default constructor.
     */
    constructor() {
        super();
    }

    /**
     * Login method.
     * @param username User's username.
     * @param password USer's password.
     * @returns {Promise<T>|Promise} Promise generated by the mongoose's query.
     */
    public login(username : string, password : string) : Promise<Object> {
        return new Promise(
            function (resolve : (data : Object) => void,
                      reject : (error : Object) => void) : void {
                this.model.findOne(
                    {username: username},
                    function (error : Object,
                              user : UserDocument) : void {
                        if (error) {
                            reject(error);
                        } else {
                            if (!user.authenticate(password)) {
                                reject(new Error("Invalid password!"));
                            } else {
                                delete user.passwordHashed;
                                delete user.passwordSalt;
                                delete user.passwordIterations;
                                resolve(user);
                            }
                        }
                    })
            });
    }

    /**
     * setThe new Credentials only if old credentials are good
     * @param username old user's username
     * @param password old user's password
     * @param newUsername new user's username
     * @param newPassword new user's password
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
                        user.username = newUsername;
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
     * Get the element represented by the _id ID.
     * @param _id The ID of the element.
     * @returns {Promise<Object>|Promise} Promise generated by the mongoose's
     * query.
     */
    public getOne(_id : string) : Promise < Object > {
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            this.model.findOne({_id: _id},
                {
                    passwordHased: false,
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
     * Get all the element of a collection.
     * @returns {Promise<Object>|Promise} Promise generated by the mongoose's
     * query.
     */
    public getAll() : Promise < Object > {
        return new Promise((resolve : (data : Object) => void,
                            reject : (error : Object) => void) => {
            this.model.find({},
                {
                    passwordHased: false,
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
        return mongoose.model<UserDocument>("User", this.getSchema());
    }

    /**
     * @description Return the user's model.
     * @returns {Model<DatabaseDocument>} The model.
     * @override
     */
    protected getSchema() : mongoose.Schema {
        let schema : mongoose.Schema = new mongoose.Schema({
            username: {
                type: String,
                required: true,
                sparse: true
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
                enum: this.USER_TYPES,
                default: this.USER_TYPES[0]
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
     * Set the methods of the user's schema.
     * @param schema The user's schema.
     */
    private setSchemaMethods(schema : mongoose.Schema) : void {
        schema.method(
            "authenticate",
            function (passwordText : string) : boolean {
                return this.hashPassword(passwordText) === this.hashed_pwd;
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

export
default
UserModel;
