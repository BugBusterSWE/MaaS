import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../components/navbar/navbar";
import {PermissionLevel} from "../../../stores/sessionStore"
import ErrorMessage from "../../components/errorMessageComponent";


/**
 * This class represents the recovery password page.
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
class RecoveryPassword extends React.Component<void, void> {

    /**
     * @description Default constructor.
     * @return {RecoveryPassword}
     */
    constructor() {
        super();
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the recovery password page.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
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
        /* tslint:enable: max-line-length */
    }
}

export default RecoveryPassword;
