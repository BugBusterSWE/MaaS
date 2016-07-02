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
        this._orderField = this._orderField.bind(this);
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

        this.state.index.header.forEach(
            function(attribute : IHeaderIndexPage) : void{
                if (attribute.sortable) {
                    documentsAttributes.push(
                        <th>
                            <i className="material-icons">sort_by_alpha</i>
                            {attribute.name}
                        </th>
                    )
                } else {
                    documentsAttributes.push(
                        <th>
                            {attribute.name}
                        </th>
                    )
                }
        });

        let attributeLength : number = documentsAttributes.length;

        this.state.index.documents.forEach(function(allDocs : IIndexDoc) : void{
            allDocs.data.forEach(
                function(document : IInteractiveDocument) : void {
                    for (let attribute in document.data) {
                        documentsValue.push(
                            <td>
                                {document.data[attribute]}
                            </td>
                        )
                    }
                })
        });

        this.state.index.documents.forEach(function(allDocs : IIndexDoc) : void{
            allDocs.data.forEach(
                function(document : IInteractiveDocument, i : number) : void {
                collections.push(
                    <tr>
                        <td>
                            {document.id}
                        </td>
                        <td>
                            {document.name}
                        </td>
                        {documentsValue
                            .slice(i * attributeLength,
                                (i * attributeLength) + attributeLength)}
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

    /**
     * @description This method is called when a column must be sorted.
     */
    private _orderField() : void {
        console.log("Order this field");
    }

}

export default Collection;