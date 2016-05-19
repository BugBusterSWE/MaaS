/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react/react-global.d.ts" />

import * as React from "react";
import * as ReactRouter from "react-router";

let Link : ReactRouter.Link = ReactRouter.Link;

export default class App extends React.Component {

    render() {
        return (
            <div>
                <nav id="navbar">
                    <div className="nav-wrapper grey darken-3">
                        <a href="" className="brand-logo">
                            <i className="material-icons left">
                                input
                            </i>
                            MaaS
                        </a>
                        <ul id="nav-mobile"
                            className="right hide-on-med-and-down">
                            <li>
                                <Link to="login">LogIn</Link>
                            </li>
                            <li>
                                <Link to="dashboard">My DashBoard</Link>
                            </li>
                        </ul>
                    </div>
                    <br />
                    {this.props.children}
                </nav>
            </div>
        )
    }
}
