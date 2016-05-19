///<reference path='../../../typings/tsd.d.ts'/>
///<reference path='../../../typings/node/node.d.ts'/>

import Dispatcher from "../dispatcher/dispatcher.ts";
import Constants from "../constants/myConstants.ts"
import * as Events from "events";

let CHANGE_EVENT : string = "change";

class CollectionStore extends Events.EventEmitter {

    // Variabile dove verranno caricati i dati da collectionsAPI
    data : Array<Object> = [];

    constructor() {
        super();
        this.actionRegister(this);
    }

    actionRegister(collectionStore : CollectionStore) : void {

        Dispatcher.register(function (payload) : void {
            let action = payload.action;
            switch (action.actionType) {
                
                case Constants.COLLECTION_EVENT:
                    // Ad ogni evento aggiorna i dati dello store
                    collectionStore.update(action.data);
                    collectionStore.emitChange();
                    break;

                default:
                // Do nothing​
            }
        });
    }

    update(data : Array<Object>) : void {
        this.data = data;
    }

    getData() : Array<Object> {
        return this.data;
    }

    emitChange() : void {
        this.emit(CHANGE_EVENT);
    }

    /*
     i seguenti metodi sono richiamati nella dashboard
     */

    addChangeListener(callback : () => void) : void {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback : () => void) : void {
        this.removeListener(CHANGE_EVENT, callback);
    }

}

let store : CollectionStore = new CollectionStore();

export default store;
