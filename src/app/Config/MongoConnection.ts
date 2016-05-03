class MongoConnection {
    private user : string;
    private password : string;
    private host : string;
    private dbName : string;

    constructor(user : string, password : string, host : string, db : string) {
        this.user = user;
        this.password = password;
        this.host = host;
        this.dbName = db;
    }

    public getUser() : string {
        return this.user;
    }

    public getPassword() : string {
        return this.password;
    }

    public getHost() : string {
        return this.host;
    }

    public getDatabaseName() : string {
        return this.dbName;
    }
}
