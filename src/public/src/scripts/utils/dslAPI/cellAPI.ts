import * as request from "superagent";
import {Response} from "superagent";
import {ICell} from "../dslDefinitions"
import {ActionError} from "../../dispatcher/dispatcher";

let cell : ICell = {
    id : "C1",
    label : "myCell",
    type : "string",
    value : "The Cell"
};

// TODO: Remove console.log function
/**
 * <p>This class represents the APIs used by {CellActionCreator}.
 *
 * @history
 * | Author           | Action Performed | Data       |
 * |------------------|------------------|------------|
 * | Emanuele Carraro | Create class     | 05/07/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 */
class CellAPIs {

    /**
     * @description
     * <p>This method send a request to the backend of MaaS with the purpose
     * to obtain the cell data.</p>
     * @returns {Promise<T>|Promise} The result or the error
     */
    public getCellData() : Promise<Object> {
        console.log("cell API getCellData");
        return new Promise(
            function (resolve : (value : ICell) => void,
                      reject : (error : Object) => void) : void {
                resolve(cell);
            })
    }
}

let cellAPIs : CellAPIs = new CellAPIs();
export default cellAPIs;
