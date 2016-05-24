/// <reference path="../../../../typings/react/react.d.ts" />

import * as React from "react";
import * as ReactRouter from "react-router";
//import Actions from "../../actionCreators/collectionActionCreator.ts"
import Navbar from "../navbar/navbarNotLogged.tsx";

let Link: ReactRouter.Link = ReactRouter.Link;

export default class RecoveryPassword extends React.Component {
    render() {
        return(
            <div>
                <Navbar></Navbar>
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Recovery Password</h3>
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
                                    <input id="email" type="email" className="validate" />
                                    <label for="email">Email</label>
                                </div>
                            </div>
                        </form>
                        <div className="right">
                            <a className="waves-effect waves-light btn">
                                <i className="material-icons left">
                                    done
                                </i>
                                Recovery
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
