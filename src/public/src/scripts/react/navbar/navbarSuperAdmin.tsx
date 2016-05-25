import * as React from "react";
//import Actions from "../../actionCreators/collectionActionCreator.ts"
import {Link} from "react-router";
//import SessionStore from "../../stores/sessionStore.ts"

interface IState{
    myEmail: string;
}

class NavbarSuperAdmin extends React.Component<void,IState> {   

    constructor(props) {
        super(props);
        this.state = {
            myEmail: "prova"
            //myEmail: SessionStore.getEmail()
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

export default NavbarSuperAdmin;
