import * as React from "react";
import {Link} from "react-router";
import sessionStore from "../../stores/sessionStore"

/**
 * INavbarGuestState defines the state of the NavbarGuest component.
 */
export interface INavbarGuestState {
    isLogged : boolean;
    userEmail : string;
}


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
class NavbarGuest extends React.Component<void, INavbarGuestState> {

    /**
     * @description Default constructor.
     */
    constructor() {
        super();
        this.state = {
            isLogged: sessionStore.isLoggedIn(),
            userEmail: sessionStore.getEmail()
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the guest navbar.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        if (this.state.isLogged) {
            /* tslint:disable: max-line-length */
            return (
                <nav>
                    <div className="nav-wrapper grey darken-3">
                        <ul id="nav-mobile" className="right">
                            <li><Link to="/UserData">{this.state.userEmail}</Link></li>
                            <li><Link to="/Logout">Logout</Link></li>
                        </ul>
                        <ul id="nav-mobile" className="left">
                            <li><Link to="/Home">Home</Link></li>
                        </ul>
                    </div>
                </nav>
            );
            /* tslint:enable: max-line-length */
        } else {
            /* tslint:disable: max-line-length */
            return (
                <nav>
                    <div className="nav-wrapper grey darken-3">
                        <ul id="nav-mobile" className="left">
                            <li>
                                <Link to="/Home">Home</Link>
                            </li>
                            <li>
                                <Link to="/Login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
            /* tslint:enable: max-line-length */
        }
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
            isLogged: sessionStore.isLoggedIn(),
            userEmail: sessionStore.getEmail()
        });
    }
}

export default NavbarGuest;
