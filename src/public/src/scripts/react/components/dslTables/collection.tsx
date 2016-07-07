import {ICollection,
    IHeaderIndexPage,
    IIndexPage,
    IIndexDoc,
    IInteractiveDocument} from "../../../utils/dslDefinitions";
import * as React from "react";
import {browserHistory} from "react-router";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import Navbar from "../navbar/navbar";
import store from "../../../stores/dslStore/collectionStore";
import collectionActionCreator from
    "../../../actions/dslActionCreator/collectionActionCreator";

export interface ICollectionState {
    index : IIndexPage;
}


/* This is the Index Page */

class Collection extends React.Component<void, ICollectionState> {

    /**
     * @description Default constructor.
     * @return {Collection}
     */
    constructor() {
        super();
        this.state = {
            index : store.getIndex()
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

        let attributeLength : number = documentsAttributes.length - 2;

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
                    <thead className="teal light-blue">
                    <tr>
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
        store.addChangeListener(this._onChange);
        collectionActionCreator.getIndexPage();
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        console.log("collection component did UNmount");
        store.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        console.log("onChange collection");
        this.setState({
            index : store.getIndex()
        });
    }

}

export default Collection;
