import * as React from "react";
import {browserHistory} from "react-router";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import Navbar from "../navbar/navbar";

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
class UpdateDocument extends React.Component<void, void> {

    /**
     * @description Default constructor.
     * @return {UpdateDocument}
     */
    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the UpdateDocument component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Update Document - Sample</h3>
                    </div>
                    <div className="divider"></div>
                    <h3>UPDATE DOCUMENT PAGE</h3>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        console.log("update document component did mount");
        if (!(sessionStore.checkPermission(PermissionLevel.MEMBER))) {
            browserHistory.push("/Error403")
        }
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        console.log("update document component did UNmount");
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        console.log("onChange update document");
    }

}

export default UpdateDocument;
