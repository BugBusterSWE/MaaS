/// <reference path="../../../../typings/react/react.d.ts" />

import * as React from "react";
import SessionActionCreator from "../../actionCreators/sessionActionCreator.ts"
import SessionStore from "../../stores/sessionStore.ts"

export default class Login extends React.Component {
    /*
    fake login
     */

    constructor(props) {
        super(props);
        this.state = { errors: [] };
        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() : void {
        SessionStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() : void {
        SessionStore.removeChangeListener(this._onChange);
    }

    _onChange() : void {
        this.setState({
            errors: SessionStore.getErrors()
        });
    }

    _onSubmit(e) : void {
        e.preventDefault();
        this.setState({ errors: [] });
        let email = this.refs.email.getDOMNode().value;
        let password = this.refs.password.getDOMNode().value;
        SessionActionCreator.login(email, password);
    }

    render() {
        return(
            <div id="content" className="container">
                <div id="titles">
                    <h3 className="black-text">Login</h3>
                </div>
                <div className="divider"></div>
                <div className="row">
                    <form className="black-text col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">email</i>
                                <input placeholder="Insert your email here"
                                       id="email" type="email"
                                       className="validate" />
                            </div>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock</i>
                                <input id="password"
                                       placeholder="Type your password here"
                                       type="password" className="validate" />
                            </div>
                        </div>
                        <div className="right">
                            <button className="waves-effect waves-light btn">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}
