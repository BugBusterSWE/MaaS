import * as React from "react";
import {Link, hashHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import userStore from "../../../stores/userStore";
import ErrorMessage from "../errorMessageComponent";
/**
 * This interface represents the state of the InviteSuperAdmin page
 */
interface ICreateSuperAdminState {

    message : string,
    token : string
}

/**
 * <p>This class represents the super admin creation page.</p>
 *
 * @history
 * | Author           | Action Performed               | Data       |
 * |------------------|--------------------------------|------------|
 * | Davide Polonio    | Create interfaces and class    | 15/06/2016 |
 *
 * @author  Davide Polonio
 * @license MIT
 *
 */
class AddSuperAdmin extends React.Component<void, ICreateSuperAdminState> {


    /**
     * @description Default constructor.
     * @return {CreateSuperAdmin}
     */
    constructor() {
        super();
        let superAdminErrorMessage : string = "";
        if (userStore.isSuperAdminCreationErrored()) {
            superAdminErrorMessage =
              userStore.getSuperAdminCreationErrorMessage();
        }
        this.state = {
            message : superAdminErrorMessage,
            token : sessionStore.getAccessToken()
        };
        /*
         * I'll need this in the future
         * this._onChange = this._onChange.bind(this);
         */
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the InviteSuperAdmin component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Add a new Super Admin</h3>
                    </div>
                    <div className="divider"></div>

                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">email</i>
                                    <input id="email" type="email" className="validate" />
                                    <label for="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="password" type="text" className="validate"  ref="password"/>
                                    <label for="password">Password of the new Super Admin</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this.addSuperAdmin.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Create Super Admin
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */
    }


    private addSuperAdmin() : void {

        console.log("On addSuperAdmin!");
        let email : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;

        let password : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;

        console.log("E-mail: " + email);
        console.log("Password: " + password);
    }
    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        if (!(sessionStore.checkPermission(PermissionLevel.SUPERADMIN))) {
            hashHistory.push("/Error403")
        }
    }
}

export default AddSuperAdmin;
