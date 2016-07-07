import * as request from "superagent";
import {Response} from "superagent";
import {ICollection, IIndexDoc, IIndexPage,
    IHeaderIndexPage, IInteractiveDocument} from "../dslDefinitions"
import {ActionError} from "../../dispatcher/dispatcher";

let headerCollection : IHeaderIndexPage[] = [
    {
        label : "doc_id",
        name : "Document id",
        selectable : false,
        sortable : false
    },
    {
        label : "doc_name",
        name : "Document name",
        selectable : true,
        sortable : true
    },
    {
        label : "city",
        name : "city",
        selectable : false,
        sortable : true
    },
    {
        label : "email",
        name : "email",
        selectable : false,
        sortable : false
    },
    {
        label : "age",
        name : "age",
        selectable : false,
        sortable : true
    },
    {
        label : "fullname",
        name : "full name",
        selectable : false,
        sortable : false
    }
];

let interactiveDocuments : IInteractiveDocument[] = [
    {
        id : "D01",
        label : "document 01",
        name : "document 01",
        data : {
            city : "Padova",
            email : "emanuele94@gmail.com",
            age : "21",
            fullname : "Emanuele Carraro"
        },
        selectable : true,
        sortable : false
    },
    {
        id : "D02",
        label : "document 02",
        name : "document 02",
        data : {
            city : "Padova",
            email : "polpetta94@gmail.com",
            age : "21",
            fullname : "Davide Polonio"
        },
        selectable : true,
        sortable : true
    },
    {
        id : "D03",
        label : "document 03",
        name : "document 03",
        data : {
            city : "Padova",
            email : "korut94@gmail.com",
            age : "21",
            fullname : "Andrea Mantovani"
        },
        selectable : false,
        sortable : false
    },
    {
        id : "D04",
        label : "document 04",
        name : "document 04",
        data : {
            city : "Padova",
            email : "drigoni94@gmail.com",
            age : "21",
            fullname : "Davide Rigoni"
        },
        selectable : false,
        sortable : false
    }
];

let allDocuments : IIndexDoc[] = [{
    id : "ALLDOCS",
    data : interactiveDocuments
}];

let indexPage : IIndexPage = {
    id : "INDEX1",
    name : "document name",
    label : "document label",
    numdocs : 3,
    perpage : 5,
    header : headerCollection,
    documents : allDocuments
};

/**
 * <p>This class represents the APIs used by {CollectionActionCreator}.
 *
 * @history
 * | Author           | Action Performed | Data       |
 * |------------------|------------------|------------|
 * | Davide Rigoni    | Create class     | 05/07/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class CollectionAPIs {

    /**
     * @description
     * <p>This method send a request to the backend of MaaS with the purpose
     * to obtain the collection data.</p>
     * @returns {Promise<T>|Promise} The result or the error
     */
    public getIndexPage() : Promise<Object> {
        console.log("collection API getIndexData");
        return new Promise(
            function (resolve : (value : IIndexPage) => void,
                      reject : (error : Object) => void) : void {
                resolve(indexPage);
            })
    }
}

let collectionAPIs : CollectionAPIs = new CollectionAPIs();
export default collectionAPIs;
