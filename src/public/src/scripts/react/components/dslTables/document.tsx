import {IDocument} from "../../../utils/dslDefinitions";
import * as React from "react";
import {Link, browserHistory} from "react-router";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import Navbar from "../navbar/navbar";
import store from "../../../stores/dslStore/documentStore";
import documentActionCreator from
    "../../../actions/dslActionCreator/documentActionCreator";

export interface IDocumentState {
    document : IDocument;
}

/* This is the Show Page */

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
            document : store.getDocument()
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

        for (let attribute in this.state.document.data) {
            documentTable.push(
                <tr>
                    <td>
                        {attribute}
                    </td>
                    <td>
                        {this.state.document.data[attribute]}
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
                        <thead className="teal light-blue">
                        <tr>
                            <th>Property</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {documentTable}
                        </tbody>
                    </table>
                    <Link className="waves-effect waves-light btn"
                          to={`/Document/update`}>
                        <i className="small material-icons">mode_edit
                        </i>
                    </Link>
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
        store.addChangeListener(this._onChange);
        documentActionCreator.getDocumentData();
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        console.log("document component did UNmount");
        store.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        console.log("onChange document");
        this.setState({
            document : store.getDocument()
        });
    }
}

export default Document;
