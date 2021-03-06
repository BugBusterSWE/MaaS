import * as React from "react";
import {Link, browserHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../../components/navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import companyActionCreator, {ICompany}
    from "../../../actions/companyActionCreator";
import ErrorMessage from "../../components/errorMessageComponent";
import companyStore from "../../../stores/companyStore";

/**
 * This interface represents the state of the {CompanyRegistration} page.
 */
export interface ICompanyRegistrationState {
    message : string;
}

/**
 * <p>This class represents the registration company page.</p>
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
class CompanyRegistration extends
    React.Component<void, ICompanyRegistrationState> {

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
            message: "",
        };

        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the CompanyRegistration component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Company registration</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="companyName" type="text" className="validate" ref="companyName"/>
                                    <label for="companyName">Name of the company</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">email</i>
                                    <input id="email" type="email" className="validate"  ref="email"/>
                                    <label for="email">Email of the Owner</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="password" type="text" className="validate"  ref="password"/>
                                    <label for="password">Password of the Owner</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this.addCompany.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Done
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
     * <p>This method is call when the user click on the add Company button.</p>
     */
    private addCompany() : void {
        let email : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        let password : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;
        let companyName : string =
            ReactDOM.
            findDOMNode<HTMLInputElement>(this.refs["companyName"]).value;
        companyActionCreator.addCompany(
            {
                email : email,
                password : password
            },
            {
                name : companyName
            }
        );
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        companyStore.addChangeListener(this._onChange);
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        companyStore.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        let errorMessage : string = "";
        if (companyStore.getAddCompanyError()) {
            errorMessage = companyStore.getAddCompanyError()
        } else {
            browserHistory.push("/Login");
        }
        this.setState({
            message : errorMessage
        });
    }
}


export default CompanyRegistration;
