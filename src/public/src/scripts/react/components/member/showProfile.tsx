import * as React from "react";
import {Link, hashHistory} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore"
import * as ReactDOM from "react-dom";
import ErrorMessage from "../errorMessageComponent";


export interface IShowProfileState {
    email : string;
}

class ShowProfile extends React.Component<void, IShowProfileState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.</p>
     * @return {UpdateProfile}
     */
    constructor() {
        super();
        this.state = {
            email: sessionStore.getEmail()
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description This method do the render of this class UserRegistration.
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
                        Update Email
                    </a>
                    <a className="waves-effect waves-light btn" onClick={this._updatePassword.bind(this)}>
                        Update Password
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

    private _updateEmail() : void {
        hashHistory.push("/Profile/UpdateEmail");
    }

    private _updatePassword() : void {
        hashHistory.push("/Profile/UpdatePassword");
    }

    private _removeProfile() : void {
        // TODO
    }

    private _removeCompany() : void {
        // TODO
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        if (!(sessionStore.checkPermission(PermissionLevel.GUEST))) {
            hashHistory.push("/Error403");
        }
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
