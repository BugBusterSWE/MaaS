import * as React from "react";
import {Link} from "react-router";
import sessionStore from "../../../stores/sessionStore";

/**
 * INavbarMemberState defines the state of the NavbarMember component.
 */
export interface INavbarMemberState {
    userEmail : string;
}


/**
 * This class represents the member navbar.
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
class NavbarMember extends React.Component<void, INavbarMemberState> {

    /**
     * @description Default constructor.
     * @return {NavbarMember}
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
     * It renders the member navbar.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <ul id="nav-mobile" className="right">
                        <li><Link to="/Profile">{this.state.userEmail}</Link></li>
                        <li><Link to="/Logout">Logout</Link></li>
                    </ul>
                    <ul id="nav-mobile" className="left">
                        <li><Link to="/Home">Home</Link></li>
                        <li><Link to="/Dashboard">Dashboard</Link></li>
                        <li><Link to="/Collection">Collection</Link></li>
                        <li><Link to="/Editor">Editor</Link></li>
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

export default NavbarMember;
