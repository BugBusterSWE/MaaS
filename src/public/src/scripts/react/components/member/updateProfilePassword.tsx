import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore from "../../../stores/sessionStore"
import * as ReactDOM from "react-dom";
import ErrorMessage from "../errorMessageComponent";

export interface IUpdateProfilePassword {
    password : string;
    new_password : string;
}

class UpdateProfilePassword extends React.Component<void, void> {

    /**
     * @description
     * <p>This constructor calls his super constructor.</p>
     * @return {UpdateProfile}
     */
    constructor() {
        super();
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
                        <h3>Update Profile</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error="prova" />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">password</i>
                                    <input id="current_password" type="password" className="validate" ref="current_password"/>
                                    <label for="current_password">Current Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">password</i>
                                    <input id="password" type="password" className="validate"  ref="password"/>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">password</i>
                                    <input id="re_password" type="password" className="validate"  ref="re_password"/>
                                    <label for="re_password">Repeat new password</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this._update.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Update
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
     * @description
     * <p>This method take the imput value of the user and create
     * the action to update the data</p>
     * @constructor
     */
    private _update() : void {
        let email : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        let currentPassword : string = ReactDOM.findDOMNode<HTMLInputElement>(
            this.refs["current_password"]).value;
        let password : string = ReactDOM.findDOMNode<HTMLInputElement>(
            this.refs["password"]).value;
        let rePassword : string = ReactDOM.findDOMNode<HTMLInputElement>(
            this.refs["re_password"]).value;

        if (rePassword == password) {
            // Send
        } else {
            // Segnalo errore
        }
    }

}

export default UpdateProfilePassword;
