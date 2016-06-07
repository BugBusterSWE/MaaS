import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore from "../../../stores/sessionStore"

class UpdateProfile extends React.Component<void, void> {

    constructor() {
        super();
    }

    render() : JSX.Element {
        return (
            <div>
                <Navbar userPermission={sessionStore.getLevel()} />
            </div>
        )
    }
}
