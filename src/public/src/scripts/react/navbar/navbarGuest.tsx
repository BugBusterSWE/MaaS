import * as React from "react";
import {Link} from "react-router";


export default class NavbarNotLogged extends React.Component<void, void> {
    render() : JSX.Element {
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><Link to="/Home">Home</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
