import Dispatcher, {Action, ActionError} from "../../dispatcher/dispatcher";
import collectionAPIs from "../../utils/dslAPI/collectionAPI";
import {IIndexPage} from "../../utils/dslDefinitions";

export let DispatcherCollectionData : Dispatcher<Action<IIndexPage>> =
    new Dispatcher<Action<IIndexPage>>();

/**
 * This class represents the creator of the action of the collection.
 *
 * @history
 * | Author           | Action Performed                          | Data       |
 * |------------------|-------------------------------------------|------------|
 * | Emanuele Carraro | Create CollectionActionCreator class      | 05/07/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 *
 */
class CollectionActionCreator {

    /**
     * @description Dispatch the action to get the data of the collection.
     */
    public getIndexPage() : void {
        console.log("get index page");
        collectionAPIs
            .getIndexPage()
            .then(function (data : IIndexPage) : void {
                DispatcherCollectionData.dispatch({
                    actionData : data,
                    actionError : undefined
                })
            })
    }

}

let collectionActionCreator : CollectionActionCreator =
    new CollectionActionCreator();
export default collectionActionCreator;

