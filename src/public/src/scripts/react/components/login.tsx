import * as React from "react";
import {Link, browserHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../stores/sessionStore";
import sessionActionCreators from "../../actions/sessionActionCreator";
import ErrorMessage from "./errorMessageComponent";

export interface ILoginState {
    isLoggedIn : boolean;
    level : string;
    message : string;
}

class Login extends React.Component<void, ILoginState> {

    constructor() {
        super();
        this.state = {
            isLoggedIn: sessionStore.isLoggedIn(),
            level: sessionStore.getLevel(),
            message: sessionStore.getAllErrors()
        };

        this._onChange = this._onChange.bind(this);

    }

    _submitLogin() : void {
        let emailValue : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        let passwordValue : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;
        sessionActionCreators.login({
            email: emailValue,
            password: passwordValue
        });
    }

    /*
     following methods are automatically called.
     */

    componentDidMount() : void {
        sessionStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() : void {
        sessionStore.removeChangeListener(this._onChange);
    }

    _onChange() : void {
        console.log("On Change");
        this.state = {
            isLoggedIn: sessionStore.isLoggedIn(),
            level: sessionStore.getLevel(),
            message: sessionStore.getAllErrors()
        };
        if (this.state.isLoggedIn) {
            switch (this.state.level) {
                case PermissionLevel.SUPERADMIN:
                    browserHistory.push("/#/SuperAdmin/ShowCompanies");
                    break;
                default:
                    browserHistory.push("/#/Dashboard");
                    break;
            }
        }

    }

    // TODO: passare parametro al messaggio di errore
    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.GUEST} />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Login</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        email
                                    </i>
                                    <input id="email" type="email" className="validate" ref="email"/>
                                    <label for="email">Email</label>
                                </div>
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        lock
                                    </i>
                                    <input id="password" type="password" className="validate" ref="password"/>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                        </form>
                        <div className="col s6">
                            <Link to= "/RecoveryPassword">
                                    Forgot your password?
                            </Link>
                        </div>
                        <div className="right">
                            <a className="waves-effect waves-light btn" onClick={this._submitLogin.bind(this)}>
                                    Sign in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    /* tslint:enable: max-line-length */
    }
}

/**
 * @description The Login type exported by default.
 */
export default Login;
