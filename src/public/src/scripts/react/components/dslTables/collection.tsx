import {ICollection,
    IHeaderIndexPage,
    IIndexPage,
    IIndexDoc,
    IInteractiveDocument} from "../../../utils/dslDefinitions";
import * as React from "react";
import {browserHistory} from "react-router";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import Navbar from "../../navbar/navbar";

export interface ICollectionState {
    collection : ICollection;
    index : IIndexPage;
}

/* This is the Index Page */

let collection : ICollection = {
    id : "COL1",
    name : "CustomCollection",
    label : "myCustomCollection"
};

let headerCollection : IHeaderIndexPage[] = [
    {
        label : "doc_id",
        name : "id",
        selectable : false,
        sortable : false
    },
    {
        label : "doc_name",
        name : "name",
        selectable : true,
        sortable : true
    },
    {
        label : "doc_data",
        name : "data",
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
            id : "123",
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
            id : "456",
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
            id : "789",
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
            id : "101",
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

class Collection extends React.Component<void, ICollectionState> {

    /**
     * @description Default constructor.
     * @return {Collection}
     */
    constructor() {
        super();
        this.state = {
            collection : collection,
            index : indexPage
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the Collection component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        let collections : Array<Object> = [];
        let documentsAttributes : Array<Object> = [];
        let documentsValue : Array<Object> = [];

        this.state.index.documents.forEach(function(allDocs : IIndexDoc) : void{
            allDocs.data.forEach(
                function(document : IInteractiveDocument) : void {
                    let data : Object = JSON.parse(document.data);
                    for (let attribute in data) {
                        documentsAttributes.push(
                            <th>
                                {attribute}
                            </th>
                        );
                    }
                })
        });

        this.state.index.documents.forEach(function(allDocs : IIndexDoc) : void{
            allDocs.data.forEach(
                function(document : IInteractiveDocument) : void {
                    let data : Object = JSON.parse(document.data);
                    for (let attribute in data) {
                        documentsValue.push(
                            <td>
                                {data[attribute]}
                            </td>
                        )
                    }
                })
        });

        this.state.index.documents.forEach(function(allDocs : IIndexDoc) : void{
            allDocs.data.forEach(
                function(document : IInteractiveDocument) : void {
                collections.push(
                    <tr>
                        <td>
                            {document.id}
                        </td>
                        <td>
                            {document.name}
                        </td>
                        {documentsValue}
                    </tr>
                );
            })
        });

        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Collection - Sample</h3>
                    </div>
                    <div className="divider"></div>
                </div>
                <table className="striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        {documentsAttributes}
                    </tr>
                    </thead>
                    <tbody>
                    {collections}
                    </tbody>
                </table>
            </div>
        );
        /* tslint:enable: max-line-length */
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        console.log("collection component did mount");
        if (!(sessionStore.checkPermission(PermissionLevel.MEMBER))) {
            browserHistory.push("/Error403")
        }
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        console.log("collection component did UNmount");
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        console.log("onChange collection");
    }

}

export default Collection;
