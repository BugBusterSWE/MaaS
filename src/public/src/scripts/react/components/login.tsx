/// <reference path="../../../../typings/react/react.d.ts" />

import * as React from "react";
import * as ReactRouter from "react-router";
import * as ReactDOM from "react-dom";
import {sessionActionCreators} from "../../actionCreators/sessionActionCreator.ts";
//import Actions from "../../actionCreators/collectionActionCreator.ts"
import Navbar from "../navbar/navbarNotLogged.tsx";


let Link : ReactRouter.Link = ReactRouter.Link;

export default class Login extends React.Component {

    _submitLogin() {
        let email = ReactDOM.findDOMNode(this.refs.email).value;
        let password = ReactDOM.findDOMNode(this.refs.password).value;
        sessionActionCreators.login(email,password);
    }
    
    render() {
        return(
            <div>
                <Navbar></Navbar>
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Login</h3>
                        <h4 className="grey-text"></h4>
                    </div>
                    <div className="divider"></div>

                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        email
                                    </i>
                                    <input id="email" type="email" className="validate" ref="email"/>
                                    <label for="email">Email</label>
                                </div>
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        lock
                                    </i>
                                    <input id="password" type="password" className="validate" ref="password" />
                                    <label for="password">Password</label>
                                </div>
                            </div>
                        </form>
                        <div className="col s6">
                            <Link to= "/RecoveryPassword">
                                Forgot your password?
                            </Link>
                        </div>
                        <div className="right">
                            <a className="waves-effect waves-light btn" onClick={this._submitLogin.bind(this)}>
                                <i className="material-icons left">
                                </i>
                                Sign in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
