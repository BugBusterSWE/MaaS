import * as React from "react";
import {Link, hashHistory} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore"
import * as ReactDOM from "react-dom";
import ErrorMessage from "../errorMessageComponent";

/**
 * This interface represents the state of the Profile page.
 */
export interface IShowProfileState {
    email : string;
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
class Profile extends React.Component<void, IShowProfileState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.</p>
     * @return {ShowProfile}
     */
    constructor() {
        super();
        this.state = {
            email: sessionStore.getEmail()
        };
        this._onChange = this._onChange.bind(this);
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
                    <div className="row">
                        <div className="row">
                            <div className="col s12">
                                <div>Email</div>
                                <div>
                                    <i className="material-icons prefix">email</i>
                                    {this.state.email}
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div>
                        <h4>Edit profile</h4>
                        <div className="divider"></div>
                        <div className="row">
                            If you want change your email click on "Change Email" button.<br/>
                            <a className="waves-effect waves-light btn" onClick={this._updateEmail.bind(this)}>
                                Change Email
                            </a>
                            If you want change your password click on "Change Password" button.<br/>
                            <a className="waves-effect waves-light btn" onClick={this._updatePassword.bind(this)}>
                                Change Password
                            </a>
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
        // TODO: Remove profile
    }

    /**
     * @description
     * <p>This method is called when user click on remove company button.</p>
     */
    private _removeCompany() : void {
        // TODO: Remove company
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
/*        if (!(sessionStore.checkPermission(PermissionLevel.GUEST))) {
            hashHistory.push("/Error403");
        }*/
        sessionStore.addChangeListener(this._onChange);
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        sessionStore.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        this.setState({
            email: sessionStore.getEmail()
        });
    }
}

export default Profile;
