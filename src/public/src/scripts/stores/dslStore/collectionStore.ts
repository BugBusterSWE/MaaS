import {IIndexPage, IHeaderIndexPage,
    IInteractiveDocument, IIndexDoc} from "../../utils/dslDefinitions"
import {DispatcherCollectionData}
    from "../../actions/dslActionCreator/collectionActionCreator";
import {EventEmitter} from "events";
import {Action, ActionError} from "../../dispatcher/dispatcher";

/**
 * CollectionStore contains all the logic of all the Collection Entity.
 *
 *
 * @history
 * | Author           | Action Performed                | Data       |
 * | ---              | ---                             | ---        |
 * | Emanuele Carraro | Create class                    | 5/07/2016  |
 *
 *
 * @author Emanuele Carraro
 * @copyright MIT
 */
class CollectionStore extends EventEmitter {

    /**
     * @description string for events management.
     */
    private static CHANGE_EVENT : string = "change";

    private headerCollection : IHeaderIndexPage[] = [
    {
        label : "",
        name : "",
        selectable : false,
        sortable : false
    }];

    private interactiveDocuments : IInteractiveDocument[] = [
    {
        id : "",
        label : "",
        name : "",
        data : {},
        selectable : false,
        sortable : false
    }];

    private allDocuments : IIndexDoc[] = [{
        id : "ALLDOCS",
        data : this.interactiveDocuments
    }];

    /**
     * @description Contains the data of the index page.
     */
    private indexPage : IIndexPage = {
        id : "",
        name : "",
        label : "",
        numdocs : 1,
        perpage : 1,
        header : this.headerCollection,
        documents : this.allDocuments
    };

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a CollectionStore and registers it to multiple
     * dispatchers. </p>
     * @return {CollectionStore}
     */
    constructor() {
        super();
        this.actionRegister(this);
    }

    /**
     * @description Get the data of the index page.
     * @returns {IIndexPage}
     */
    public getIndex() : IIndexPage {
        return this.indexPage;
    }

    /**
     * @description Update the index page.
     * @param data {IIndexPage} The data of the index page.
     * @returns {void}
     */
    public updateData(data : IIndexPage) : void {
        this.indexPage = data;
    }

    /**
     * @description attach a React component as a listener to this store
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback</p>
     * @returns {void}
     */
    public addChangeListener(callback : () => void) : void {
        this.on(CollectionStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Remove a listener.
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback.</p>
     * @returns {void}
     */
    public removeChangeListener(callback : () => void) : void {
        this.removeListener(CollectionStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Registers the CollectionStore to multiple dispatchers.
     * @param store {CollectionStore}
     * @returns {void}
     */
    private actionRegister(store : CollectionStore) : void {

        DispatcherCollectionData.register(
            function (action : Action<IIndexPage>) : void {
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
        this.emit(CollectionStore.CHANGE_EVENT);
    }

}

let store : CollectionStore = new CollectionStore();
export default store;
