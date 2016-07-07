import * as React from "react";
import {browserHistory} from "react-router";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import Navbar from "../navbar/navbar";

/**
 * <p>CellUpdate is a react component that
 * renders the update cell component.
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
class UpdateCell extends React.Component<void, void> {

    /**
     * @description Default constructor.
     * @return {UpdateCell}
     */
    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the UpdateCell component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Update Cell - Sample</h3>
                    </div>
                    <div className="divider"></div>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="cellValue" type="text" className="validate" ref="cellValue"/>
                                <label for="cellValue">New value of cell</label>
                            </div>
                        </div>
                        <div className="right">
                            <a className="waves-effect waves-light btn">
                                <i className="material-icons left">done</i>
                                Update Cell
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
        console.log("update cell component did mount");
        if (!(sessionStore.checkPermission(PermissionLevel.MEMBER))) {
            browserHistory.push("/Error403")
        }
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        console.log("update cell component did UNmount");
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        console.log("onChange update cell");
    }

}

export default UpdateCell;
