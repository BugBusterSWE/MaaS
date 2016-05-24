/// <reference path="../../../../typings/react/react.d.ts" />

import * as React from "react";
import Actions from "../../actionCreators/collectionActionCreator.ts"
import * as ReactRouter from "react-router";

let Link : ReactRouter.Link = ReactRouter.Link;

export default class NavbarMember extends React.Component {
    render() {
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <div id="nav-mail" className="right">
                        <Link id="navMail" to="/Login">Login</Link>
                    </div>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><Link to="/Home">Home</Link></li>
                        <li><Link to="/Products">Products</Link></li>
                        <li><Link to="/Orders">Orders</Link></li>
                        <li><Link to="/Bills">Bills</Link></li>
                        <li><Link to="/Customers">Customers</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
