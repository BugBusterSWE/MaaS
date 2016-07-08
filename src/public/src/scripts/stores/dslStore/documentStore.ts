import {IDocument} from "../../utils/dslDefinitions"
import {DispatcherDocumentData}
    from "../../actions/dslActionCreator/documentActionCreator";
import {EventEmitter} from "events";
import {Action, ActionError} from "../../dispatcher/dispatcher";

/**
 * DocumentStore contains all the logic of all the Document Entity.
 *
 *
 * @history
 * | Author           | Action Performed                | Data       |
 * | ---              | ---                             | ---        |
 * | Emanuele Carraro | Create class DocumentStore      | 5/07/2016  |
 *
 *
 * @author Emanuele Carraro
 * @copyright MIT
 */
class DocumentStore extends EventEmitter {

    /**
     * @description string for events management.
     */
    private static CHANGE_EVENT : string = "change";

    /**
     * @description Contains the data of the document.
     */
    private document : IDocument = {
        id : "",
        label : "",
        name : "",
        data : {}
    };

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a DocumentStore and registers it to multiple
     * dispatchers. </p>
     * @return {DocumentStore}
     */
    constructor() {
        super();
        this.actionRegister(this);
    }

    /**
     * @description Get the data of the document.
     * @returns {IDocument}
     */
    public getDocument() : IDocument {
        return this.document;
    }

    /**
     * @description Update the document.
     * @param data {IDocument} The data of the document.
     * @returns {void}
     */
    public updateData(data : IDocument) : void {
        console.log("update document");
        this.document = data;
    }

    /**
     * @description attach a React component as a listener to this store
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback</p>
     * @returns {void}
     */
    public addChangeListener(callback : () => void) : void {
        this.on(DocumentStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Remove a listener.
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback.</p>
     * @returns {void}
     */
    public removeChangeListener(callback : () => void) : void {
        this.removeListener(DocumentStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Registers the documentStore to multiple dispatchers.
     * @param store {DocumentStore}
     * @returns {void}
     */
    private actionRegister(store : DocumentStore) : void {

        DispatcherDocumentData.register(
            function (action : Action<IDocument>) : void {
                store.updateData(action.actionData);
                store.emitChange();
            }
        );

    }

    /**
     * @description Emit changes to React components.
     * @returns {void}
     */
    private emitChange() : void {
        this.emit(DocumentStore.CHANGE_EVENT);
    }

}

let store : DocumentStore = new DocumentStore();
export default store;
