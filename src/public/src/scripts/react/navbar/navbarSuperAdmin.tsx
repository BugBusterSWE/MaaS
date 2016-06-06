import * as React from "react";
import {Link, browserHistory} from "react-router";
import sessionActionCreators from "../../actions/sessionActionCreator";

/**
 *
 * INavbarSuperAdminStateProps defines the props attribute that the Navbar
 * should have.
 *
 */
export interface INavbarSuperAdminStateProps {
    userEmail : string;
}

/**
 * This class represents the super admin navbar.
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
class NavbarSuperAdmin extends React.Component<INavbarSuperAdminStateProps,
    void> {

    /**
     * @description Default constructor.
     */
    constructor() {
        super();
    }


    /**
     * @description
     * <p>Render method of the component.
     * It renders the super admin navbar.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <ul id="nav-mobile" className="right">
                        <li><Link id="navMail" to="/UserData">{this.props.userEmail}</Link></li>
                        <li>
                            <a onClick={this._submitLogout.bind(this)}>
                                Logout
                            </a>
                        </li>
                    </ul>
                    <ul id="nav-mobile" className="left">
                        <li><Link to="/SuperAdmin/ShowCompanies">Show companies</Link></li>
                        <li><Link to="/SuperAdmin/InviteSuperAdmin">Invite super admin</Link></li>
                    </ul>
                </div>
            </nav>
        );
        /* tslint:enable: max-line-length */
    }

    /**
     * @description This method execute the logout.
     */
    private _submitLogout() : void {
        sessionActionCreators.logout();
        browserHistory.push("/#/Logout");
    }
}

/**
 * @description The NavbarSuperAdmin type exported by default.
 */
export default NavbarSuperAdmin;
