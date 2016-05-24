import * as request from "superagent";

class CollectionAPIs {

    dati_di_prova : Array<Object> = [
        {
            id: 0,
            name: "Collection0",
            label: "C0",
            weight: 3,
            sortable: true
        },
        {
            id: 1,
            name: "Collection1",
            label: "C1",
            weight: 2,
            sortable: true
        },
        {
            id: 2,
            name: "Collection2",
            label: "C2",
            weight: 1,
            sortable: false
        },
        {
            id: 3,
            name: "Collection3",
            label: "C3",
            weight: 9,
            sortable: false
        }
    ];

    getCollections() : Promise {

        let dati : Array<Object> = this.dati_di_prova;

        return new Promise(function (resolve, reject) {
            /**
             * Il codice commentato qui in seguito 
             * sarebbe una richiesta fatta tramite superagent
             * per attaccarsi alle API del backend
             * request
             * .get("")
             * .end(function (error, res) {
             *       if (error) {
             *           reject(error);
             *       } else {
             *           resolve(res);
             *       }
             *   });
             */

            // Ritorno dei dati per mochup
            resolve(dati);
        });
    }

    destroy(id : number) : Promise {

        let dati : Array<Object> = this.dati_di_prova;

        return new Promise( function(resolve , reject) {
            // Elimino il primo valore dai dati di prova
            delete dati[id];
            // Ritorno i dati aggiornati
            resolve(dati);
        })
    }
}

let collectionsAPIs : CollectionAPIs = new CollectionAPIs();

export default collectionsAPIs;
