import * as React from "react";
import {Link, hashHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import ErrorMessage from "./errorMessageComponent";
import {PermissionLevel} from "../../stores/sessionStore"
import userStore from "../../stores/userStore";
import sessionStore from "../../stores/sessionStore";
import userActionCreator from "../../actions/userActionCreator";

/**
 *  This interface represents the state of {UserRegistration} page.
 */
export interface IUserRegistrationState {
    message : string;
}

/**
 * <p>IUserRegistrationProps defines an interface which stores the
 * params (the user_id an company_id passed through the URI).</p>
 */
export interface IUserRegistrationProps {
    params : ReactRouter.Params
}

/**
 * This class represents the user registration page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class UserRegistration extends
    React.Component<IUserRegistrationProps, IUserRegistrationState> {


    /**
     * @description ID of the company.
     */
    private company_id : string = this.props.params["company_id"];


    /**
     * @description ID of the user.
     */
    private user_id : string = this.props.params["user_id"];


    /**
     * @description
     * <p>This constructor calls his super constructor.</p>
     * @return {UserRegistration}
     */
    constructor() {
        super();
        let errorMessage : string = "";
        if (userStore.isErrored()) {
            errorMessage = userStore.getErrorMessage();
        }
        this.state = {
            message : errorMessage
        };
        this._onChange = this._onChange.bind(this);
    }


    // TODO: passare parametro al messaggio di errore
    /**
     * @description This method do the render of this class UserRegistration.
     * @returns {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.GUEST} />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>User registration</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="password" type="text" className="validate"  ref="password"/>
                                    <label for="password">Password of the Owner</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this.addMember.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Registration
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */
    }

    /**
     * @description
     * <p>This method is call when the user click on the Add Member button.</p>
     */
    private addMember() : void {
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        if (!(sessionStore.checkPermission(PermissionLevel.GUEST))) {
            hashHistory.push("/Error403")
        }
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
        if (userStore.isErrored()) {
            errorMessage = userStore.getErrorMessage()
        }
        this.setState({
            message : errorMessage
        });
    }
}


export default UserRegistration;
