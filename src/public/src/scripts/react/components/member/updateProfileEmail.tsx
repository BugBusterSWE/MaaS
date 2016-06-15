import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore from "../../../stores/sessionStore"
import * as ReactDOM from "react-dom";
import ErrorMessage from "../errorMessageComponent";


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
class UpdateProfileEmail extends React.Component<void, void> {

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
                        <ErrorMessage error="prova" />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">email</i>
                                    <input id="new_email" type="text" className="validate" ref="new_email"/>
                                    <label for="new_email">Email</label>
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
     * @description
     * <p>This method take the input value of the user and create
     * the action to update the data</p>
     * @constructor
     */
    private _update() : void {
        let email : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        let password : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;
        // TODO: update profile
    }

}

export default UpdateProfileEmail;
