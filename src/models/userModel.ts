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
    username : string,
    passwordHashed : string,
    passwordSalt : string,
    passwordIterations : number,
    level : string
}

export default class UserModel extends Model {

    private static PWD_DEFAULT_ITERATIONS : number = 1000;
    private static PWD_LENGHT : number = 50;

    private USER_TYPES : Array<string> = [
        "BASE",
        "ADMIN",
        "OWNER",
        "SUPERADMIN"
    ];

    constructor() {
        super();
    }

    public login(username : string, password : string) : Promise<Object> {
        return new Promise(
            function (resolve : (data : Object) => void,
                      reject : (error : Object) => void) : void {
                this.model.findOne(
                    {username: username},
                    function (error : Object,
                              user : mongoose.Model<UserDocument>) : void {
                        if (error) {
                            reject(err);
                        } else {
                            if (!user.authenticate(password)) {
                                reject(new Error("Password non valida"));
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

    public getOne(_id : string) : Promise<Object> {
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

    public getAll() : Promise<Object> {
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

    protected getModel() : mongoose.Model<ModelUser> {
        return mongoose.model<ModelUser>("User", this.getSchema());
    }

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
                default: this.PWD_DEFAULT_ITERATIONS
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
