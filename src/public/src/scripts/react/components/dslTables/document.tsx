import {IDocument} from "../../../utils/dslDefinitions";
import * as React from "react";
import {browserHistory} from "react-router";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import Navbar from "../../navbar/navbar";

export interface IDocumentState {
    document : IDocument
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
                        <tr>
                            <td>Id</td>
                            <td>{this.state.document.data.id}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{this.state.document.data.city}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.document.data.email}</td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>{this.state.document.data.age}</td>
                        </tr>
                        <tr>
                            <td>Full Name</td>
                            <td>{this.state.document.data.fullname}</td>
                        </tr>
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
        console.log("cell component did mount");
        if (!(sessionStore.checkPermission(PermissionLevel.MEMBER))) {
            browserHistory.push("/Error403")
        }
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        console.log("cell component did UNmount");
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        console.log("onChange cell");
    }

}

export default Document;
