import CollectionsApis from "../utils/collectionsAPI.ts";
import Dispatcher from "../dispatcher/dispatcher.ts";
import Constants from "../constants/myConstants.ts"

class CollectionActionCreator {

    getData() : void {
        CollectionsApis.getCollections().then(function (dati) {
                Dispatcher.handleServerAction({
                    actionType : Constants.COLLECTION_EVENT,
                    data : dati
                })
            })
    }

    destroy(id : number) : void {
        CollectionsApis.destroy(id).then(function (dati) {
                Dispatcher.handleViewAction({
                    actionType : Constants.COLLECTION_EVENT,
                    data : dati
                })
            })
    }
}

let collectionActionCreator :
    CollectionActionCreator = new CollectionActionCreator();

export default collectionActionCreator;
