import * as React from "react";
import {Link} from "react-router";

export interface INavbarMemberProps {
    userEmail : string;
}

class NavbarMember extends React.Component<INavbarMemberProps, void> {

    constructor() {
        super();
    }

    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <ul id="nav-mobile" className="right">
                        <li><Link to="/Logout">Logout</Link></li>
                        <li><Link id="navMail" to="/UserData">{this.props.userEmail}</Link></li>
                    </ul>
                    <ul id="nav-mobile" className="left">
                        <li><Link to="/Dashboard">Dashboard</Link></li>
                        <li><Link to="/Collection">Collection</Link></li>
                        <li><Link to="/Editor">Editor</Link></li>
                    </ul>
                </div>
            </nav>
        );
        /* tslint:enable: max-line-length */
    }
}

export default NavbarMember;
