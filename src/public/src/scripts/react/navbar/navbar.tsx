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
        switch (this.props.userPermission) {
            case PermissionLevel.SUPERADMIN: {
                return(
                    <NavbarGuest />
                );
            }
            break;
            case PermissionLevel.OWNER:
            case PermissionLevel.ADMIN: {
                return(
                    <NavbarGuest />
                );
            }
            break;
            case PermissionLevel.MEMBER: {
                return(
                    <NavbarGuest />
                );
            }
            break;
            default: {
                return(
                    <NavbarGuest />
                );
            }
        }
    }
}

export default Navbar;
