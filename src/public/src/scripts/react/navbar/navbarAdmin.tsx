import * as React from "react";
import {Link} from "react-router";

export interface INavbarAdminProps {
    userEmail : string;
}

class NavbarAdmin extends React.Component<INavbarAdminProps, void> {

    constructor() {
        super();
    }

    render() : JSX.Element {
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <div id="nav-mail" className="right">
                        <Link id="navMail" to="/UserData">
                            {this.props.userEmail}
                        </Link>
                    </div>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li>
                            <Link to="/SuperAdmin/ShowCompanies">
                                Show companies
                            </Link>
                        </li>
                        <li>
                            <Link to="/SuperAdmin/InviteSuperAdmin">
                                Invite super admin
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavbarAdmin;
