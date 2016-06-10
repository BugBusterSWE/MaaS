import * as React from "react";
import {Link} from "react-router";
import Navbar from "../navbar/navbar";
import {PermissionLevel} from "../../stores/sessionStore"
import companyActionCreator, {IAddCompanyUser, IAddCompanyName}
    from "../../actions/companyActionCreator";
import * as ReactDOM from "react-dom";
import ErrorMessage from "./errorMessageComponent";
import companyStore from "../../stores/companyStore";
import sessionStore from "../../stores/sessionStore"

/**
 * This interface represents the state of the component UserRegistration.
 */
interface IUserRegistrationState {
    message : string;
    token : string;
}

/**
 * This class represents the user registration page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class UserRegistration extends React.Component<void, IUserRegistrationState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.</p>
     * @return {UserRegistration}
     */
    constructor() {
        super();
    }


    // TODO: passare parametro al messaggio di errore
    /**
     * @description This method do the render of this class UserRegistration.
     * @returns {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.GUEST} />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>AUser registration</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="password" type="text" className="validate"  ref="password"/>
                                    <label for="password">Password of the Owner</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this.addUser.bind(this)}>
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

    // TODO: da finire
    /**
     * @description
     */
    private addUser() : void {
        let password : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;

    }
}


export default UserRegistration;
