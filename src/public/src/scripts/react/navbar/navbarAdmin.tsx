import * as React from "react";
import {Link, browserHistory} from "react-router";
import sessionActionCreators from "../../actions/sessionActionCreator";


/**
 *
 * INavbarAdminProps defines the props attribute that the Navbar should have.
 *
 */
export interface INavbarAdminProps {
    userEmail : string;
}

/**
 * This class represents the admin navbar.
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
class NavbarAdmin extends React.Component<INavbarAdminProps, void> {

    /**
     * @description Default constructor.
     */
    constructor() {
        super();
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the admin navbar.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <ul id="nav-mobile" className="right">
                        <li><Link id="navMail" to="/UserData">{this.props.userEmail}</Link></li>
                        <a onClick={this._submitLogout.bind(this)}>
                            Logout
                        </a>
                    </ul>
                    <ul id="nav-mobile" className="left">
                        <li><Link to="/Dashboard">Dashboard</Link></li>
                        <li><Link to="/Collection">Collection</Link></li>
                        <li><Link to="/Editor">Editor</Link></li>
                        <li><Link to="/Members">Members</Link></li>
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
 * @description The NavbarAdmin type exported by default.
 */
export default NavbarAdmin;