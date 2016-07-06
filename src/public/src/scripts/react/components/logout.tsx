import * as React from "react";
import Navbar from "../navbar/navbar";
import {browserHistory} from "react-router";
import {PermissionLevel} from "../../stores/sessionStore";
import sessionActionCreator from "../../actions/sessionActionCreator";


/**
 * This class represents the logout page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class Logout extends React.Component<void , void> {

    /**
     * @description Default constructor.
     * @return {Logout}
     */
    constructor() {
        super();
    }

    /**
     * @description This method do the render of this class Logout.
     * @returns {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Logout</h3>
                    </div>
                    <div className="divider"></div>
                    <div>
                        Logout correctly, you will be redirected to the home page of MaaS.
                    </div>
                </div>
            </div>
        );
    /* tslint:enable: max-line-length */
    }

    /**
     * @description <p> This method will call automatically at the mount of the
     * react component. </p>
     */
    private componentDidMount() : void {
        sessionActionCreator.logout();
        setTimeout(() : void  => {
            browserHistory.push("/Home")
        }, 3000);
    }
}

export default Logout;
