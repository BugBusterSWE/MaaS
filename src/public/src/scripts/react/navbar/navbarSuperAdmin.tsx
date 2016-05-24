/// <reference path="../../../../typings/react/react.d.ts" />

import * as React from "react";
import Actions from "../../actionCreators/collectionActionCreator.ts"
import * as ReactRouter from "react-router";
import SessionStore from "../../stores/sessionStore.ts"

let Link : ReactRouter.Link = ReactRouter.Link;

export default class NavbarSuperAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myEmail: SessionStore.getEmail()
        }
    }

    render() {
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <div id="nav-mail" className="right">
                        <Link id="navMail" to="/UserData">{this.state.myEmail}</Link>
                    </div>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><Link to="/SuperAdmin/ShowCompanies">Show companies</Link></li>
                        <li><Link to="/SuperAdmin/InviteSuperAdmin">Invite super admin</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
