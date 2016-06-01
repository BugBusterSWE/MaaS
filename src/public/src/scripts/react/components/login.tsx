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
            error: SessionStore.getErrors()
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
            error: SessionStore.getErrors()
        });
        if (this.state.token) {
            console.log("token is defined");
            this.props.history.push("/SuperAdmin/ShowCompanies");
        }
    }

    // TODO: passare parametro al messaggio di errore
    /* tslint:disable: max-line-length */
    render() : JSX.Element {
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
    }
    /* tslint:enable: max-line-length */
}

export default Login;
