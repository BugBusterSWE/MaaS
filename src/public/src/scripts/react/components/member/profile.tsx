import * as React from "react";
import {Link, hashHistory} from "react-router";
import * as ReactDOM from "react-dom";
import ErrorMessage from "../errorMessageComponent";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import userStore from "../../../stores/userStore";
import userActionCreator from "../../../actions/userActionCreator";



/**
 * This interface represents the state of the Profile page.
 */
export interface IProfileState {
    email : string;
    message : string;
}


/**
 * This class represents the user profile page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/06/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class Profile extends React.Component<void, IProfileState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.</p>
     * @return {Profile}
     */
    constructor() {
        super();
        let errorMessage : string = "";
        if (sessionStore.isErrored()) {
            errorMessage = userStore.getRemoveProfileErrorMessage()
        }
        this.state = {
            email: sessionStore.getEmail(),
            message: errorMessage
        };
        this._onChangeSession = this._onChangeSession.bind(this);
        this._onChangeUser = this._onChangeUser.bind(this);
    }

    /**
     * @description This method do the render of this class {Profile}.
     * @returns {JSX.Element}
     */
    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Show Profile</h3>
                    </div>
                    <div className="divider"></div>
                    In this pages is possible change your profile or delete it. If you are a Owner, you can delete your company from MaaS.
                    <br/><br/>
                    <ErrorMessage error={this.state.message} />
                    <div className="row">
                        <div className="row">
                            <div className="col s12">
                                <div><strong>Email: </strong>{this.state.email}</div>
                            </div>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div>
                        <h4>Edit profile</h4>
                        <div className="divider"></div>
                        <div className="row">
                            If you want change your email click on "Change Email" button.<br/>
                            <div className="right ">
                                <a className="waves-effect waves-light btn" onClick={this._updateEmail.bind(this)}>
                                    Change Email
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            If you want change your password click on "Change Password" button.<br/>
                            <div className="right ">
                                <a className="waves-effect waves-light btn" onClick={this._updatePassword.bind(this)}>
                                    Change Password
                                </a>
                            </div>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div className="row">
                        <h4>Danger zone</h4>
                        <div className="divider"></div>
                        <div className="row">
                            If you want remove your profile from MaaS, insert your email and click on "Remove Profile"
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate" ref="email"/>
                                <label for="email">Email</label>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn red" onClick={this._removeProfile.bind(this)}>
                                    Remove Profile
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            If you want remove your company from MaaS, insert the name of the company and click on "Remove Company"
                            <div className="input-field col s12">
                                <input id="company" type="text" ref="company"/>
                                <label for="company">Company</label>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn red" onClick={this._removeCompany.bind(this)}>
                                    Remove Company
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        /* tslint:enable: max-line-length */
    }

    /**
     * @description
     * <p>This method is called when user click on change email button.</p>
     */
    private _updateEmail() : void {
        hashHistory.push("/Profile/UpdateEmail");
    }

    /**
     * @description
     * <p>This method is called when user click on change password button.</p>
     */
    private _updatePassword() : void {
        hashHistory.push("/Profile/UpdatePassword");
    }

    /**
     * @description
     * <p>This method is called when user click on remove profile button.</p>
     */
    private _removeProfile() : void {
        let emailValue : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        if (emailValue == this.state.email) {
            userActionCreator.removeProfile({
                token: sessionStore.getAccessToken(),
                company_id: sessionStore.getUserCompanyID(),
                user_id: sessionStore.getUserID()
            });
        } else {
            this.setState({
                email: this.state.email,
                message: "Error, email not correct."
            })
        }
    }

    /**
     * @description
     * <p>This method is called when user click on remove company button.</p>
     */
    private _removeCompany() : void {
        // TODO: Check the name of the company
        // TODO: Remove company
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        if (!(sessionStore.checkPermission(PermissionLevel.GUEST))) {
            hashHistory.push("/Error403");
        }
        userStore.addChangeListener(this._onChangeSession);
        userStore.addChangeListener(this._onChangeUser);
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        sessionStore.removeChangeListener(this._onChangeSession);
        userStore.removeChangeListener(this._onChangeUser);
    }

    /**
     * @description This method is called every time the session store change.
     */
    private _onChangeSession() : void {
        this.setState({
            email: sessionStore.getEmail(),
            message: this.state.message
        });
    }

    /**
     * @description This method is called every time the user store change.
     */
    private _onChangeUser() : void {
        let errorMessage : string = "";
        if (sessionStore.isErrored()) {
            errorMessage = userStore.getRemoveProfileErrorMessage()
        }
        this.setState({
            email: this.state.email,
            message: errorMessage
        });
    }
}

export default Profile;
