import * as React from "react";
// I import Actions from "../../actionCreators/collectionActionCreator.ts"
import {Link} from "react-router";
// I import SessionStore from "../../stores/sessionStore.ts"

interface INavbarSuperAdminState {
    email : string;
}

class NavbarSuperAdmin extends React.Component<void, INavbarSuperAdminState> {

    constructor() {
        super();
        this.state = {
            email: "prova"
            // My Email: SessionStore.getEmail()
        }
    }

    render() : JSX.Element {
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <div id="nav-mail" className="right">
                        <Link id="navMail" to="/UserData">
                            {this.state.email}
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

export default NavbarSuperAdmin;
