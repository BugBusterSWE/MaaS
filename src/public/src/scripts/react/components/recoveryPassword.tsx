import * as React from "react";
import {Link} from "react-router";
import Navbar from "../navbar/navbarNotLogged";
import ErrorMessage from "./errorMessageComponent";

// TODO: da sistemare
class RecoveryPassword extends React.Component<void, void> {
    /* tslint:disable: max-line-length */
    render() : JSX.Element {
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Recovery Password</h3>
                    </div>
                    <div className="divider"></div>

                    <div className="row">
                        <ErrorMessage error={"sistemare"} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        email
                                    </i>
                                    <input id="email" type="email"
                                           className="validate" />
                                    <label for="email">Email</label>
                                </div>
                            </div>
                        </form>
                        <div className="right">
                            <a className="waves-effect waves-light btn">
                                <i className="material-icons left">
                                    done
                                </i>
                                Recovery
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    /* tslint:enable: max-line-length */
}

export default RecoveryPassword;
