import * as React from "react";
import {Link, hashHistory} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore"
import * as ReactDOM from "react-dom";
import ErrorMessage from "../errorMessageComponent";

/**
 * This interface represents the state of the ShowProfile page.
 */
export interface IShowProfileState {
    email : string;
}


/**
 * This class represents the user show profile page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/06/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class ShowProfile extends React.Component<void, IShowProfileState> {

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
     * @description This method do the render of this class {ShowProfile}.
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
                        <ErrorMessage error="prova" />
                        <div className="row">
                            <div className="col s12">
                                <div>Email</div>
                                <div>{this.state.email}</div>
                            </div>
                        </div>
                    </div>
                    <a className="waves-effect waves-light btn" onClick={this._updateEmail.bind(this)}>
                        Change Email
                    </a>
                    <a className="waves-effect waves-light btn" onClick={this._updatePassword.bind(this)}>
                        Change Password
                    </a>
                    <a className="waves-effect waves-light btn" onClick={this._removeProfile.bind(this)}>
                        Remove Profile
                    </a>
                    <a className="waves-effect waves-light btn" onClick={this._removeCompany.bind(this)}>
                        Remove Company
                    </a>
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

export default ShowProfile;
