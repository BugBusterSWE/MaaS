import Dispatcher, {Action, ActionError} from "../../dispatcher/dispatcher";
import documentAPIs from "../../utils/dslAPI/documentAPI";
import {IDocument} from "../../utils/dslDefinitions";

export let DispatcherDocumentData : Dispatcher<Action<IDocument>> =
    new Dispatcher<Action<IDocument>>();

/**
 * This class represents the creator of the action of the document.
 *
 * @history
 * | Author           | Action Performed                        | Data       |
 * |------------------|-----------------------------------------|------------|
 * | Emanuele Carraro | Create DocumentActionCreator class      | 05/07/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 *
 */
class DocumentActionCreator {

    /**
     * @description Dispatch the action to get the data of the document.
     */
    public getDocumentData() : void {
        documentAPIs
            .getDocumentData()
            .then(function (data : IDocument) : void {
                DispatcherDocumentData.dispatch({
                    actionData : data,
                    actionError : undefined
                })
            })
    }

}

let documentActionCreator : DocumentActionCreator =
    new DocumentActionCreator();
export default documentActionCreator;
