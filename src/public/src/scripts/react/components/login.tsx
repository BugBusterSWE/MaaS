import * as React from "react";
import {Link} from "react-router";
import * as ReactDOM from "react-dom";
import sessionActionCreators from "../../actions/sessionActionCreator";
import Navbar from "../navbar/navbarNotLogged";
import SessionStore from "../../stores/sessionStore";

interface ILoginState {
    token : string;
}

interface ILoginProps {
    history : HistoryModule.History
}

class Login extends React.Component<ILoginProps, ILoginState> {
    
    constructor() {
        super();
        this.state = {
            token: SessionStore.getAccessToken()
        };
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
    
    private prova : string = "Ciao";

    _onChange() : void {
        console.log("onChange Login");
        console.log(this.prova);
        /* if (this.state.token) {
            console.log("access token is defined");
            this.props.history.push("/SuperAdmin/ShowCompanies");
        } */
    }

    render() : JSX.Element {
        return(
            <div>
                <Navbar></Navbar>
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Login</h3>
                        <h4 className="grey-text"></h4>
                    </div>
                    <div className="divider"></div>

                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        email
                                    </i>
                                    <input id="email" type="email"
                                           className="validate" ref="email"/>
                                    <label for="email">Email</label>
                                </div>
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        lock
                                    </i>
                                    <input id="password" type="password"
                                           className="validate" ref="password"/>
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
                            <a className="waves-effect waves-light btn"
                               onClick={this._submitLogin.bind(this)}>
                                <i className="material-icons left">
                                </i>
                                Sign in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
