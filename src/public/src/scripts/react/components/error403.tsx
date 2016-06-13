import * as React from "react";
import Navbar from "../navbar/navbar";
import {hashHistory} from "react-router";
import {PermissionLevel} from "../../stores/sessionStore";
import ErrorMessage from "./errorMessageComponent";
import sessionActionCreator from "../../actions/sessionActionCreator";


/**
 * This class represents the 403 error page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class Error403 extends React.Component<void , void> {

    /**
     * @description Default constructor.
     */
    constructor() {
        super();
    }

    /**
     * @description This method do the render of this class error403.
     * @returns {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.GUEST} />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Error 403</h3>
                    </div>
                    <div className="divider"></div>
                    <div>
                        <ErrorMessage error="No permission to access. You will be redirected to the home page of MaaS." />
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
            hashHistory.push("/Home")
        }, 10000);
    }
}

export default Error403;
