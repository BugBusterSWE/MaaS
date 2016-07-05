import * as React from "react";
import {Link, hashHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../../components/navbar/navbar";
import {PermissionLevel} from "../../../stores/sessionStore"
import ErrorMessage from "../../components/errorMessageComponent";
import userStore from "../../../stores/userStore";
import userActionCreator from "../../../actions/userActionCreator";

/**
 * This interface represents the state of the {RecoveryPassword} page.
 */
export interface IRecoveryPasswordnState {
    message : string;
}

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
class RecoveryPassword extends React.Component<void, IRecoveryPasswordnState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates an CompanyRegistration, defines its state and
     * binds _onChange function to "this"</p>
     * @return {AddCompany}
     */
    constructor() {
        super();
        this.state = {
            message: ""
        };

        this._onChange = this._onChange.bind(this);
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
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        email
                                    </i>
                                    <input id="email" name="email" type="email"
                                           className="validate" />
                                    <label for="email">Email</label>
                                </div>
                            </div>
                        </form>
                        <div className="right">
                            <a className="waves-effect waves-light btn" onClick={this.recovery.bind(this)}>
                                <i className="material-icons left">done</i>
                                Recovery
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */
    }

    /**
     * @description
     * <p>This method is call when the user click on the add Company button.</p>
     */
    private recovery() : void {
        let email : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        userActionCreator.recoveryPassword({
            email: email
        })
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        userStore.addChangeListener(this._onChange);
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        userStore.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        let errorMessage : string = "";
        if (userStore.isRecoveryPasswordErrored()) {
            errorMessage = userStore.getRecoveryPasswordErrorMessage()
        }
        this.setState({
            message : errorMessage,
        });
    }
}

export default RecoveryPassword;
