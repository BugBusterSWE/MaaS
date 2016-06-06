import * as React from "react";
import {Link} from "react-router";
import SessionStore, {PermissionLevel} from "../../stores/sessionStore"
import NavbarGuest from "./navbarGuest";
import NavbarMember from "./navbarMember";
import NavbarAdmin from "./navbarAdmin";
import NavbarSuperAdmin from "./navbarSuperAdmin";


/**
 *
 * INavbarProps defines the props attribute that the Navbar should have.
 *
 */
export interface INavbarProps {
    userPermission : PermissionLevel;
}

/**
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
class Navbar extends React.Component<INavbarProps, void> {

    /**
     * @description Default constructor.
     */
    constructor() {
        super();
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the navbar according to the props param.</p>
     * @return {JSX.Element}
     */
    render() : JSX.Element {
            if (this.props.userPermission == PermissionLevel.SUPERADMIN) {
                return(
                    <NavbarSuperAdmin userEmail={SessionStore.getEmail()} />
                );
            } else if (this.props.userPermission == PermissionLevel.OWNER
                || this.props.userPermission == PermissionLevel.ADMIN) {
                return(
                    <NavbarAdmin userEmail={SessionStore.getEmail()}/>
                );
            } else if (this.props.userPermission == PermissionLevel.MEMBER) {
                return(
                    <NavbarMember userEmail={SessionStore.getEmail()}/>
                );
            } else {
                return(
                    <NavbarGuest />
                );
            }

    }
}

/**
 * @description The Navbar type exported by default.
 */
export default Navbar;
