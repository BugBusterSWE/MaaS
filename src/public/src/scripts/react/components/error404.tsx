import * as React from "react";
import Navbar from "../navbar/navbar";
import {hashHistory} from "react-router";
import {PermissionLevel} from "../../stores/sessionStore";
import ErrorMessage from "./errorMessageComponent";
import sessionActionCreator from "../../actions/sessionActionCreator";


/**
 * This class represents the 404 error page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class Error404 extends React.Component<void , void> {

    /**
     * @description Default constructor.
     * @return {Error404}
     */
    constructor() {
        super();
    }

    /**
     * @description This method do the render of this class error404.
     * @returns {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Error 404</h3>
                    </div>
                    <div className="divider"></div>
                    <div>
                        <ErrorMessage error="Page not found. You will be redirected to the home page of MaaS." />
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

export default Error404;
