import * as React from "react";
import {Router, Link, browserHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../../components/navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import sessionActionCreators from "../../../actions/sessionActionCreator";
import ErrorMessage from "../../components/errorMessageComponent";

/**
 * This interface represents the state of the {Login} page.
 */
export interface ILoginState {
    isLoggedIn : boolean;
    level : string;
    message : string;
}


/**
 * This class represents the login page.
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
class Login extends React.Component<void, ILoginState> {

    /**
     * @description Default constructor.
     * @return {Login}
     */
    constructor() {
        super();
        this.state = {
            isLoggedIn: sessionStore.isLoggedIn(),
            level: sessionStore.getLevel(),
            message: ""
        };
        this._onChange = this._onChange.bind(this);
    }


    /**
     * @description
     * <p>Render method of the component.
     * It renders the login component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Login</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12" id="login_form">
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

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        sessionStore.addChangeListener(this._onChange);
        if (this.state.isLoggedIn) {
            this._loginRedirect(this.state.level);
        }
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        sessionStore.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is call when the user click on the login button.
     */
    private _submitLogin() : void {
        let emailValue : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        let passwordValue : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;
        sessionActionCreators.login({
            email: emailValue,
            password: passwordValue
        });
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        let errorMessage : string = "";
        if (sessionStore.isErrored()) {
            errorMessage = sessionStore.getErrorMessage()
        }
        this.setState({
            isLoggedIn: sessionStore.isLoggedIn(),
            level: sessionStore.getLevel(),
            message: errorMessage
        });
        if (this.state.isLoggedIn) {
            this._loginRedirect(this.state.level);
        }
    }

    /**
     * @description
     * <p>This method redirect the user to the correct
     * page after the login.</p>
     * @param level {string} permission of the user.
     */
    private _loginRedirect(level : string) : void {
        switch (level) {
            case PermissionLevel.SUPERADMIN: {
                browserHistory.push("/SuperAdmin/ShowCompanies");
            }
                break;
            default: {
                browserHistory.push("/Dashboard");
            }
                break;
        }
    }

}

export default Login;
