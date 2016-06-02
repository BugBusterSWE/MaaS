import * as React from "react";
import {Link} from "react-router";
import * as ReactDOM from "react-dom";
import sessionActionCreators from "../../actions/sessionActionCreator";
import Navbar from "../navbar/navbarNotLogged";
import SessionStore from "../../stores/sessionStore";
import ErrorMessage from "./errorMessageComponent";

interface ILoginState {
    token : string;
    error : string;
}

interface ILoginProps {
    history : HistoryModule.History;
}

class Login extends React.Component<ILoginProps, ILoginState> {

    constructor() {
        super();
        this.state = {
            token: SessionStore.getAccessToken(),
            error: SessionStore.getError()
        };

        this._onChange = this._onChange.bind(this);
        this.redirectTo = this.redirectTo.bind(this);

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
     i seguenti metodi vengono richiamati in automatico
     */

    componentDidMount() : void {
        SessionStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() : void {
        SessionStore.removeChangeListener(this._onChange);
    }

    _onChange() : void {
        console.log("On Change");
        this.setState({
            token: SessionStore.getAccessToken(),
            error: SessionStore.getError()
        });
        if (this.state.token) {
            console.log("token is defined");
            this.redirectTo("/SuperAdmin/ShowCompanies");
        }
    }

    // TODO: passare parametro al messaggio di errore
    render() : JSX.Element {

        if (!this.state.token) {
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
                            <ErrorMessage error={this.state.error} />
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
        } else {
            return(
                <div>
                    {window.location.replace("/#/SuperAdmin/ShowCompanies")}
                </div>
            );
        }
    /* tslint:enable: max-line-length */
    }

    private redirectTo(path : string) : void {
        console.log("redirectTo");
        this.props.history.push(path);
    }
}

export default Login;
