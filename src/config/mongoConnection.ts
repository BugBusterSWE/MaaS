/**
 * This class stores the parameters for the MondoDB connection.
 */
class MongoConnection {
    /**
     * @description The username of the user used for read data from the
     * database.
     */
    private user : string;

    /**
     * @description The password of the user used for read data from the
     * database.
     */
    private password : string;

    /**
     * @description The host of the database.
     */
    private host : string;

    /**
     * @description The port of the database.
     */
    private port : number;

    /**
     * @description The name of the database.
     */
    private dbName : string;

    /**
     * Complete constructor
     * @param user Username of the user used for read data from the database
     * @param password Password of the user used for read data from the
     * database.
     * @param host Database's host.
     * @param port database's port.
     * @param db Database's name.
     */
    constructor(user : string, password : string, host : string, port : number,
                db : string) {
        this.user = user;
        this.password = password;
        this.host = host;
        this.port = port;
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
     * Getter for database's port.
     * @returns {string} The name of the database.
     */
    public getDatabasePort() : number {
        return this.port;
    }

    /**
     * Getter for database's name.
     * @returns {string} The name of the database.
     */
    public getDatabaseName() : string {
        return this.dbName;
    }
}

export default MongoConnection;
