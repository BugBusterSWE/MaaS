import {MongoConnection} from "MongoConnection";

abstract class Configuration {
  private envName : string;
  private mongoConnection : MongoConnection;
  private serverSecret : string;

  constructor(envName : string,
              connection : MongoConnection,
              serverSecret : string) {
      this.envName = envName;
      this.mongoConnection = connection;
      this.serverSecret = serverSecret;
  }

  public getEnvName() : string {
    return this.envName;
  }

  public getMongoConnection() : MongoConnection {
    return this.mongoConnection;
  }

  public getServerSecret() : string {
    return this.serverSecret;
  }
}
