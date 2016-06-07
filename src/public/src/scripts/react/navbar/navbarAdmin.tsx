import * as React from "react";
import {Link} from "react-router";
import sessionStore from "../../stores/sessionStore";


/**
 * INavbarAdminState defines the state of the NavbarAdmin component.
 */
export interface INavbarAdminState {
    userEmail : string;
}

/**
 * This class represents the admin navbar.
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
class NavbarAdmin extends React.Component<void, INavbarAdminState> {

    /**
     * @description Default constructor.
     */
    constructor() {
        super();
        this.state = {
            userEmail: sessionStore.getEmail()
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the admin navbar.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <ul id="nav-mobile" className="right">
                        <li><Link to="/UserData">{this.state.userEmail}</Link></li>
                        <li><Link to="/Logout">Logout</Link></li>
                    </ul>
                    <ul id="nav-mobile" className="left">
                        <li><Link to="/Dashboard">Dashboard</Link></li>
                        <li><Link to="/Collection">Collection</Link></li>
                        <li><Link to="/Editor">Editor</Link></li>
                        <li><Link to="/Members">Members</Link></li>
                    </ul>
                </div>
            </nav>
        );
        /* tslint:enable: max-line-length */
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        sessionStore.addChangeListener(this._onChange);
    }

    /**
     * @description This method is called when the component unmount.
     */
    private componentWillUnmount() : void {
        sessionStore.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        this.setState ({
            userEmail: sessionStore.getEmail()
        });
    }
}

export default NavbarAdmin;
