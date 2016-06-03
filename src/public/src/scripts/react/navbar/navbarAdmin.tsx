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
        /* tslint:disable: max-line-length */
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <div id="nav-mail" className="right">
                        <Link id="navMail" to="/UserData">{this.props.userEmail}</Link>
                    </div>
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
}

export default NavbarAdmin;
