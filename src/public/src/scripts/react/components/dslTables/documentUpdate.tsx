import * as React from "react";
import {IDocument} from "../../../utils/dslDefinitions";
import {browserHistory} from "react-router";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import Navbar from "../navbar/navbar";
import store from "../../../stores/dslStore/documentStore";

export interface IUpdateDocumentState {
    document : IDocument;
}

/**
 * <p>DocumentUpdate is a react component that
 * renders the update document component.
 * </p>
 *
 * @history
 * | Author           | Action Performed    | Data        |
 * |------------------|---------------------|-------------|
 * | Emanuele Carraro |  create class       | 25/06/2015  |
 *
 * @author Emanuele Carraro
 * @license MIT
 */
class UpdateDocument extends React.Component<void, IUpdateDocumentState> {

    /**
     * @description Default constructor.
     * @return {UpdateDocument}
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
     * It renders the UpdateDocument component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        let attrValues : Array<Object> = [];

        for (let attribute in this.state.document.data) {
            attrValues.push(
                <div className="row">
                <div className="input-field col s12">
                    <input type="text"
                           className="validate"/>
                    <label>New value of {attribute}</label>
                </div>
                </div>
            );
        }

        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Update Document</h3>
                    </div>
                    <div className="divider"></div>
                    <form className="col s12">
                        {attrValues}
                        <div className="right">
                            <a className="waves-effect waves-light btn">
                                <i className="material-icons left">done</i>
                                Update Document
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        if (!(sessionStore.checkPermission(PermissionLevel.MEMBER))) {
            browserHistory.push("/Error403")
        }
        store.addChangeListener(this._onChange);
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        store.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        this.setState({
            document : store.getDocument()
        });
    }

}

export default UpdateDocument;
