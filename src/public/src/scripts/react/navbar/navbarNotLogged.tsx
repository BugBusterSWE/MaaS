import * as React from "react";
import Actions from "../../actionCreators/collectionActionCreator.ts"
import * as ReactRouter from "react-router";

let Link : ReactRouter.Link = ReactRouter.Link;

export default class NavbarNotLogged extends React.Component {
    render() {
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