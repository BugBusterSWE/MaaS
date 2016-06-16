import * as React from "react";
import {Link, hashHistory} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import userStore from "../../../stores/userStore";
import userActionCreator from "../../../actions/userActionCreator";
import * as ReactDOM from "react-dom";
import ErrorMessage from "../errorMessageComponent";

/**
 * This interface represents the state of the update profile email page.
 */
export interface IUpdateProfileEmailState {
    message : string;
}

/**
 * This class represents the user update profile email page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/06/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class UpdateProfileEmail extends
    React.Component<void, IUpdateProfileEmailState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.</p>
     * @return {UpdateProfileEmail}
     */
    constructor() {
        super();
        let updateEmailErrorMessage : string = "";
        if (userStore.isUpdateEmailErrored()) {
            updateEmailErrorMessage = userStore.getUpdateEmailErrorMessage();
        }
        this.state = {
            message: updateEmailErrorMessage
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>This method do the render of this class {UpdateProfileEmail}.</p>
     * @returns {JSX.Element}
     */
    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Update email</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">email</i>
                                    <input id="new_email" type="text" className="validate" ref="new_email"/>
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
            hashHistory.push("/Error403");
        }
        userStore.addChangeListener(this._onChange);
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        userStore.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the user store change.
     */
    private _onChange() : void {
        let updateEmailErrorMessage : string = "";
        if (userStore.isUpdateEmailErrored()) {
            updateEmailErrorMessage = userStore.getUpdateEmailErrorMessage();
        }
        this.setState({
            message: updateEmailErrorMessage
        });
    }

    /**
     * @description
     * <p>This method take the input value of the user and create
     * the action to update the data</p>
     * @constructor
     */
    private _update() : void {
        let email : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        // TODO: correct data field?
        userActionCreator.updateUserEmail({
            _id : undefined,
            email : undefined,
            level : undefined,
            company_id : sessionStore.getUserCompanyID(),
            token : sessionStore.getAccessToken()
        });
    }

}

export default UpdateProfileEmail;
