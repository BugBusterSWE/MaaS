import databaseAPIs from "../utils/databaseAPI";
import Dispatcher, {Action, ActionError} from "../dispatcher/dispatcher";


/**
 * This interface represent the essential data needed for remove a database.
 */
export interface IRemoveDatabase {
    id_company : string;
    id_database : string;
}

/**
 * This interface represents the remove database response.
 */
export interface IRemoveDatabaseResponse {
    message : string;
}

export let DispatcherRemoveDatabase :
    Dispatcher<Action<IRemoveDatabaseResponse>> =
    new Dispatcher<Action<IRemoveDatabaseResponse>>();

/**
 * This class represents the creator of the action of the database.
 *
 * @history
 * | Author           | Action Performed                    | Data       |
 * |------------------|-------------------------------------|------------|
 * | Davide Rigoni    | Create class and interfaces         | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 *
 */
class DatabaseActionCreator {

}

let databaseActionCreator : DatabaseActionCreator = new DatabaseActionCreator();
export default databaseActionCreator;
