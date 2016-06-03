import * as React from "react";
import {Link} from "react-router";
import SessionStore from "../../stores/sessionStore"
import NavbarGuest from "./navbarGuest";
import NavbarMember from "./navbarMember";
import NavbarAdmin from "./navbarAdmin";
import NavbarSuperAdmin from "./navbarSuperAdmin";



export enum PermissionLevel {
    GUEST,
    MEMBER,
    ADMIN,
    OWNER,
    SUPERADMIN
}

export interface INavbarProps {
    userPermission : PermissionLevel;
}

class Navbar extends React.Component<INavbarProps, void> {

    constructor() {
        super();
    }

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

export default Navbar;
