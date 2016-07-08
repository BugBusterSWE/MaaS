import * as React from "react";
import {Link, browserHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../../components/navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import userStore from "../../../stores/userStore";
import userActionCreator from "../../../actions/userActionCreator";
import ErrorMessage from "../../components/errorMessageComponent";

/**
 * This class represents the user editor page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/06/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class Editor extends React.Component<void, void> {

    /**
     * @description
     * <p>This constructor calls his super constructor.</p>
     * @return {UpdateProfileEmail}
     */
    constructor() {
        super();
    }

    /**
     * @description
     * <p>This method do the render of this class {Editor}.</p>
     * @returns {JSX.Element}
     */
    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Editor</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">email</i>
                                    <input id="new_email" type="email" className="validate" ref="new_email"/>
                                    <label for="new_email">Email</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this._update.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Update Email
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
        /* tslint:enable: max-line-length */
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        if (!(sessionStore.checkPermission(PermissionLevel.GUEST))) {
            browserHistory.push("/Error403");
        }
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        // TODO: necessary?
    }
}

export default Editor;
