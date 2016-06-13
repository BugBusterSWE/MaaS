import * as React from "react";
import {Link} from "react-router";
import sessionStore, {PermissionLevel} from "../../stores/sessionStore"
import NavbarGuest from "./navbarGuest";
import NavbarMember from "./navbarMember";
import NavbarAdmin from "./navbarAdmin";
import NavbarSuperAdmin from "./navbarSuperAdmin";


/**
 * INavbarProps defines the state  attribute that the Navbar should have.
 */
export interface INavbarState {
    userPermission : PermissionLevel;
}

/**
 * <p>This class represents the navbar component, which load the correct navbar
 * according to the page navbar.</p>
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
class Navbar extends React.Component<void, INavbarState> {

    /**
     * @description Default constructor.
     * @return {Navbar}
     */
    constructor() {
        super();
        this.state = {
            userPermission: sessionStore.getLevel()
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the navbar according to the props param.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
            if (this.state.userPermission == PermissionLevel.SUPERADMIN) {
                return(
                    <NavbarSuperAdmin />
                );
            } else if (this.state.userPermission == PermissionLevel.OWNER
                || this.state.userPermission == PermissionLevel.ADMIN) {
                return(
                    <NavbarAdmin />
                );
            } else if (this.state.userPermission == PermissionLevel.MEMBER) {
                return(
                    <NavbarMember />
                );
            } else {
                return(
                    <NavbarGuest />
                );
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
            userPermission: sessionStore.getLevel()
        });
    }
}

export default Navbar;
