import CollectionsApis from "../utils/collectionsAPI.ts";
import Dispatcher from "../dispatcher/dispatcher.ts";
import Constants from "../constants/myConstants.ts"

export interface CollectionActionCreator {
    getData() : void;
    destroy(id : number) : void;
}

class CCollectionActionCreator implements CollectionActionCreator {

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

export let collectionActionCreator :
    CollectionActionCreator = new CCollectionActionCreator();
