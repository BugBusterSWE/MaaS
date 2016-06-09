import * as React from "react";
import {Link} from "react-router";
import Navbar from "../navbar/navbar";
import {PermissionLevel} from "../../stores/sessionStore"
import ErrorMessage from "./errorMessageComponent";

// TODO: da sistemare
class RecoveryPassword extends React.Component<void, void> {

    // TODO: passare parametro al messaggio di errore
    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={sessionStore.getLevel()} />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Signing up</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error="prova" />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">email</i>
                                    <input id="email" type="text" className="validate" ref="email"/>
                                    <label for="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">password</i>
                                    <input id="password" type="password" className="validate"  ref="password"/>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this.UpdateProfile.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Update Profile
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */
    }
}

export default RecoveryPassword;
