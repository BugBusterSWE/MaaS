import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbar";
import {PermissionLevel} from "../../../stores/sessionStore"
import ErrorMessage from "../errorMessageComponent";

// TODO: passare parametro al messaggio di errore
/**
 * <p>This class represents the invite super admin page.</p>
 *
 * @history
 * | Author           | Action Performed               | Data       |
 * |------------------|--------------------------------|------------|
 * | Davide Rigoni    | Create interfaces and class    | 06/06/2016 |
 *
 * @author  Davide Rigoni
 * @license MIT
 *
 */
class InviteSuperAdmin extends React.Component<void, void> {

    /**
     * @description Default constructor.
     * @return {InviteSuperAdmin}
     */
    constructor() {
        super();
    }


    /**
     * @description
     * <p>Render method of the component.
     * It renders the InviteSuperAdmin component.</p>
     * @return {JSX.Element}
     */
    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.SUPERADMIN} />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Invite super admin</h3>
                    </div>
                    <div className="divider"></div>

                    <div className="row">
                        <ErrorMessage error= "Prova" />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">email</i>
                                    <input id="email" type="email" className="validate" />
                                    <label for="email">Email</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn">
                                    <i className="material-icons left">done</i>
                                    Send invitation
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

export default InviteSuperAdmin;
