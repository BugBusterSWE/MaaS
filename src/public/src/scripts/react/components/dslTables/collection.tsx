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

let headerCollection : IHeaderIndexPage[] = [{
    label : "document label",
    name : "document name",
    selectable : true,
    sortable : false
}];

let interactiveDocuments : IInteractiveDocument[] = [
    {
        id : "D01",
        label : "document 01",
        name : "document 01",
        data : "data 01",
        selectable : true,
        sortable : false
    },
    {
        id : "D02",
        label : "document 02",
        name : "document 02",
        data : "data 02",
        selectable : true,
        sortable : true
    },
    {
        id : "D03",
        label : "document 03",
        name : "document 03",
        data : "data 03",
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
