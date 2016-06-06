import * as React from "react";
import {Link} from "react-router";

/**
 * This class represents the guest navbar.
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
class NavbarNotLogged extends React.Component<void, void> {

    /**
     * @description
     * <p>Render method of the component.
     * It renders the guest navbar.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <ul id="nav-mobile" className="left">
                        <li><Link to="/Home">Home</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavbarNotLogged;
