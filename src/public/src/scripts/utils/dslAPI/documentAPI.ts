import * as request from "superagent";
import {Response} from "superagent";
import {IDocument} from "../dslDefinitions"
import {ActionError} from "../../dispatcher/dispatcher";

let document : IDocument = {
    id : "D1",
    label : "myDocument",
    name : "document",
    data : {
        id : "123",
        city : "Padova",
        email : "emanuele94@gmail.com",
        age : "21",
        fullname : "Emanuele Carraro"
    }
};

/**
 * <p>This class represents the APIs used by {DocumentActionCreator}.
 *
 * @history
 * | Author           | Action Performed | Data       |
 * |------------------|------------------|------------|
 * | Emanuele Carraro | Create class     | 05/07/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 */
class DocumentAPIs {

    /**
     * @description
     * <p>This method send a request to the backend of MaaS with the purpose
     * to obtain the cell data.</p>
     * @returns {Promise<T>|Promise} The result or the error
     */
    public getCellData() : Promise<Object> {
        console.log("document API getDocumentData");
        return new Promise(
            function (resolve : (value : IDocument) => void,
                      reject : (error : Object) => void) : void {
                resolve(document);
            })
    }
}

let documentAPIs : DocumentAPIs = new DocumentAPIs();
export default documentAPIs;
