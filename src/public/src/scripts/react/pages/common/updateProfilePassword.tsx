import * as React from "react";
import {Link, browserHistory} from "react-router";
import Navbar from "../../components/navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import userStore from "../../../stores/userStore";
import userActionCreator from "../../../actions/userActionCreator";
import * as ReactDOM from "react-dom";
import ErrorMessage from "../../components/errorMessageComponent";


/**
 * This interface represents the state of the update profile password page.
 */
export interface IUpdateProfilePasswordState {
    message : string;
}

/**
 * This class represents the update profile password page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/06/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class UpdateProfilePassword extends
    React.Component<void, IUpdateProfilePasswordState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.</p>
     * @return {UpdateProfilePassword}
     */
    constructor() {
        super();
        this.state = {
            message: ""
        };
        this._onChangeUserStore = this._onChangeUserStore.bind(this);
        this._onChangeSessionStore = this._onChangeSessionStore.bind(this);
    }

    /**
     * @description
     * <p>This method do the render of this class {UpdateProfilePassword}.</p>
     * @returns {JSX.Element}
     */
    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Update password</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="current_password" type="password" className="validate" ref="current_password"/>
                                    <label for="current_password">Current password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="new_password" type="password" className="validate"  ref="new_password"/>
                                    <label for="new_password">New password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="re_password" type="password" className="validate"  ref="re_password"/>
                                    <label for="re_password">Repeat new password</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this._update.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Update Password
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
        userStore.addChangeListener(this._onChangeUserStore);
        sessionStore.addChangeListener(this._onChangeSessionStore);
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        userStore.removeChangeListener(this._onChangeUserStore);
        sessionStore.removeChangeListener(this._onChangeSessionStore);
    }

    /**
     * @description This method is called every time the user store change.
     */
    private _onChangeUserStore() : void {
        let updatePasswordErrorMessage : string = "";
        if (userStore.isUpdatePasswordErrored()) {
            updatePasswordErrorMessage =
                userStore.getUpdatePasswordErrorMessage();
        }
        this.setState({
            message: updatePasswordErrorMessage
        });
    }

    /**
     * @description This method is called every time the session store change.
     */
    private _onChangeSessionStore() : void {
        browserHistory.push("/Profile");
    }

    /**
     * @description
     * <p>This method take the input value of the user and create
     * the action to update the data</p>
     * @constructor
     */
    private _update() : void {
        let currentPassword : string = ReactDOM.findDOMNode<HTMLInputElement>(
            this.refs["current_password"]).value;
        let password : string = ReactDOM.findDOMNode<HTMLInputElement>(
            this.refs["new_password"]).value;
        let rePassword : string = ReactDOM.findDOMNode<HTMLInputElement>(
            this.refs["re_password"]).value;

        if (rePassword == password) {
            userActionCreator.updateUserPassword({
                _id : sessionStore.getUserID(),
                password : password,
                company_id : sessionStore.getUserCompanyID(),
                token : sessionStore.getAccessToken()
            });
        } else {
            this.setState({
                message: "The new password is not repeated correctly"
            });
        }
    }

}

export default UpdateProfilePassword;
