import {IDocument} from "../../../utils/dslDefinitions";
import * as React from "react";
import {browserHistory} from "react-router";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import Navbar from "../../navbar/navbar";

export interface IDocumentState {
    document : IDocument;
}

/* This is the Show Page */

let document : IDocument = {
    id : "D1",
    label : "myDocument",
    name : "document",
    data : {
        id : "123",
        city : "Padova",
        email : "emanuele94@gmail.com",
        age : "21",
        fullname : "Emanuele Carraro"
    }
};

/**
 * <p>Document is a react component that
 * renders the document component.
 * </p>
 *
 * @history
 * | Author           | Action Performed    | Data       |
 * |------------------|---------------------|------------|
 * | Emanuele Carraro |  create class       | 25/06/2015  |
 *
 * @author Emanuele Carraro
 * @license MIT
 */
class Document extends React.Component<void, IDocumentState> {

    /**
     * @description Default constructor.
     * @return {Document}
     */
    constructor() {
        super();
        this.state = {
            document : document
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the Document component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        let documentTable : Array<Object> = [];

        for (let attribute in document.data) {
            documentTable.push(
                <tr>
                    <td>
                        {attribute}
                    </td>
                    <td>
                        {document.data[attribute]}
                    </td>
                </tr>
            );
        }

        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Document - Sample</h3>
                    </div>
                    <div className="divider"></div>
                    <table className="striped">
                        <thead>
                        <tr>
                            <th>Property</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {documentTable}
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
        console.log("document component did mount");
        if (!(sessionStore.checkPermission(PermissionLevel.MEMBER))) {
            browserHistory.push("/Error403")
        }
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        console.log("document component did UNmount");
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        console.log("onChange document");
    }

}

export default Document;
