import * as React from "react";
import {Link} from "react-router";

export interface INavbarSuperAdminStateProps {
    userEmail : string;
}

class NavbarSuperAdmin extends React.Component<INavbarSuperAdminStateProps,
    void> {

    constructor() {
        super();
    }

    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <div id="nav-mail" className="right">
                        <Link id="navMail" to="/UserData">{this.props.userEmail}</Link>
                    </div>
                    <ul id="nav-mobile" className="left">
                        <li><Link to="/SuperAdmin/ShowCompanies">Show companies</Link></li>
                        <li><Link to="/SuperAdmin/InviteSuperAdmin">Invite super admin</Link></li>
                    </ul>
                </div>
            </nav>
        );
        /* tslint:enable: max-line-length */
    }
}

export default NavbarSuperAdmin;
