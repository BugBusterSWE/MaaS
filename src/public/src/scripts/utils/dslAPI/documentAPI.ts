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
 * | Davide Rigoni    | Create class     | 05/07/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class DocumentAPIs {

    /**
     * @description
     * <p>This method send a request to the backend of MaaS with the purpose
     * to obtain the document data.</p>
     * @returns {Promise<T>|Promise} The result or the error
     */
    public getDocumentData() : Promise<Object> {
        return new Promise(
            function (resolve : (value : IDocument) => void,
                      reject : (error : Object) => void) : void {
                resolve(document);
            })
    }
}

let documentAPIs : DocumentAPIs = new DocumentAPIs();
export default documentAPIs;
