import * as mongoose from "mongoose";
import Model from "./model.ts";

type Promise<T> = mongoose.Promise<T>;

/**
 * Define the form of a permission of a user on the DSL.
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Andrea Mantovani | Create interface | 07/05/2016 |
 *
 * @author Andrea Mantovani
 * @license MIT
 */
export interface PermissionOnDSL {
    /**
     * @description
     * Id user
     */
    user : string;

    /**
     * @description
     * Set the permission of read a DSL
     */
    read : boolean;

    /**
     * @description
     * Set the permission of execute a DSL
     */
    exec : boolean;
}

/**
 * Define the attribute of a dsl's document.
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Andrea Mantovani | Create interface | 08/05/2016 |
 *
 * @author Andrea Mantovani
 * @license MIT
 */
export interface DSLDocument extends mongoose.Document {
    /**
     * @description
     * Register of users with access to the DSL
     */
    permission : Array<PermissionOnDSL>,
    /**
     * @description
     * Code of the DSL
     */
    content : string;
}

/**
 * DSLModel implements the dsl business logic. It contains model and scheme
 * defined by MongooseJS.
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Andrea Mantovani | Add method *get*, *getAll*, *add* | 08/05/2016 |
 * | Andrea Mantovani | Create class | 07/05/2016 |
 *
 * @author Andrea Mantovani
 * @license MIT
 */
export class DSLModel extends Model {
    /**
     * Schema of the collection in the MongoDB database. It follows the
     * definition declared in the DSLDocument interface.
     */
    private static schema : mongoose.Schema = new mongoose.Schema({
        permission:     [{user: String, read: Boolean, exec: Boolean}],
        content:        String
    });

    /**
     * Model's dsl
     */
    private model : mongoose.Model<DSLDocument>;

    /**
     * Default constructor.
     * @return {DSLModel}
     * This.
     */
    constructor() {
        this.model = this.getConnection().model<DSLDocument>(
            "DSL",
            DSLModel.schema
        );
    }

    /**
     * Get the DLSs that the user have access it.
     * @param user {string}
     * Id user
     * @return {Promise<DSLDocument[]>}
     * The promise for the set of DSL'code.
     */
    public getAll(user : string) : Promise<DSLDocument[]> {
        return this.model
                /*
                Get all relative DSL document where the user is show in the
                permissions table
                 */
                .find({
                    permission: {
                        $elemMatch: { // Necessary for multiple conditions
                            user: user,
                            read: true
                        }
                    }
                })
                /*
                Select only the code of the DSL
                 */
                .select("content")
                /*
                Exec query
                 */
                .exec();
    }

    /**
     * Get the DSL with the id specified and the user is able to access
     * @param user {string}
     * Id of the user
     * @param id {string}
     * Id of the DSL
     * @return {Promise<DSLDocument>}
     * The promise for the DSL's code.
     */
    public get(user : string, id : string) : Promise<DSLDocument> {
        // Take the only one matching result
        return this.model.findOne({
            _id:            id, // Univocal key assigned by MongoDB
            permission:     {
                                $elemMatch: {
                                    user: user,
                                    read: true
                                }
                            }
        })
        .select("content")
        .exec();
    }

    /**
     * Save DSLDocument in the database.
     * @param dsl {DSLDocument}
     * Any compliant object at the DSLDocument interface
     * @returns {Promise<function(Result): void>}
     * Promise of the request to save the document into the database. The
     * template param defines the *resolve* data type when the promise
     * has resolved.
     */
    public add<Result>(dsl : DSLDocument) :
    Promise<(data : Result) => void> {
        return new mongoose.Promise<(data : Result) => void>((
            reject : (err : Object) => void, // Object is better than any
            resolve : (data : Result) => void
        ) => {
            /*
            Create an other document within the value of param dsl.
            In this way, there isn't any problem with the real content of dls.
             */
            let doc : DSLDocument = new this.model({
                permission: dsl.permission,
                content:    dsl.content
            });

            // Save dsl
            doc.save<Result>( (err : Object, data : Result) => {
                if (err !== undefined) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
