/**
 * This class stores the parameters for the MondoDB connection.
 */
export class MongoConnection {
    /**
     * The username of the user used for read data from the database.
     */
    private user : string;

    /**
     * The password of the user used for read data from the database.
     */
    private password : string;

    /**
     * The host of the database.
     */
    private host : string;

    /**
     * The name of the database.
     */
    private dbName : string;

    /**
     * Complete constructor
     * @param user Username of the user used for read data from the database
     * @param password Password of the user used for read data from the
     * database.
     * @param host Host of the database.
     * @param db Name of the database.
     */
    constructor(user : string, password : string, host : string, db : string) {
        this.user = user;
        this.password = password;
        this.host = host;
        this.dbName = db;
    }

    /**
     * Getter for the username of the user used for read data from the database.
     * @returns {string} The username of the user used for read data from the
     * database.
     */
    public getUser() : string {
        return this.user;
    }

    /**
     * Getter for the password of the user used for read data from the database.
     * @returns {string} The password of the user used for read data from the
     * database.
     */
    public getPassword() : string {
        return this.password;
    }

    /**
     * Getter for the database's host.
     * @returns {string} The host of the database.
     */
    public getHost() : string {
        return this.host;
    }

    /**
     * Getter for database's name.
     * @returns {string} The name of the database.
     */
    public getDatabaseName() : string {
        return this.dbName;
    }
}
