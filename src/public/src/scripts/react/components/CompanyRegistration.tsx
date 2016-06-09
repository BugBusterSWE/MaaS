import * as React from "react";
import {Link} from "react-router";
import Navbar from "../navbar/navbar";
import {PermissionLevel} from "../../stores/sessionStore"
import ErrorMessage from "./errorMessageComponent";

/**
 * This class represents the logout page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class CompanyRegistration extends React.Component<void, void> {

    /**
     * @description Default constructor
     */
    constructor() {
        super();
        this.state = {
            token: SessionStore.getAccessToken(),
            error: SessionStore.getAllErrors()
        };

        this._onChange = this._onChange.bind(this);
    }

    // TODO: passare parametro al messaggio di errore
    /**
     * @description This method do the render of this class CompanyRegistration.
     * @returns {JSX.Element}
     */
    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.GUEST} />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Company registration</h3>
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
                                    Registration
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

export default CompanyRegistration;
