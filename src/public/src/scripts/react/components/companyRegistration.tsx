import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbar";
import {PermissionLevel} from "../../../stores/sessionStore"
import companyActionCreator, {IAddCompanyUser, IAddCompanyName}
    from "../../../actions/companyActionCreator";
import * as ReactDOM from "react-dom";
import ErrorMessage from "../errorMessageComponent";
import companyStore from "../../../stores/companyStore";
import sessionStore from "../../../stores/sessionStore"

/**
 * This interface represents the state of the component CompanyRegistration.
 */
interface ICompanyRegistrationState {
    message : string;
    token : string;
}

/**
 * This class represents the  company registration page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class CompanyRegistration extends
    React.Component<void, ICompanyRegistrationState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates an CompanyRegistration, defines its state and
     * binds _onChange function to "this"</p>
     * @return {CompanyRegistration}
     */
    constructor() {
        super();
        this.state = {
            message: companyStore.getAddCompanyError(),
            token: sessionStore.getAccessToken()
        };

        this._onChange = this._onChange.bind(this);
    }


    // TODO: passare parametro al messaggio di errore
    /**
     * @description This method do the render of this class CompanyRegistration.
     * @returns {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.GUEST} />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Add company</h3>
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
                                    <label for="email">Email of the super Owner</label>
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
                                    Add Company
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
     * @description This method use CompanyActionCreator to create a company.
     */
    private addCompany() : void {
        let email : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        let password : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;
        let companyName : string =
            ReactDOM.
            findDOMNode<HTMLInputElement>(this.refs["companyName"]).value;
        console.log("AddCompany React");
        console.log(email);
        companyActionCreator.addCompany(
            {
                email : email,
                password : password
            },
            {
                name : companyName
            },
            this.state.token
        );
    }

    /*
     following methods are automatically called.
     */

    /**
     * @description
     * <p>This method is automatically called at the mount of the component</p>
     */
    private componentDidMount() : void {
        companyStore.addChangeListener(this._onChange);
    }

    /**
     * @description
     * <p>This method is automatically called at the unmount
     * of the component</p>
     */
    private componentWillUnmount() : void {
        companyStore.removeChangeListener(this._onChange);
    }

    /**
     * @description
     * <p>This method is automatically called when there is a
     * change in the store.</p>
     */
    private _onChange() : void {
        console.log("onChange addCompany");
        let errorMessage : string = "";
        if (companyStore.isErrored()) {
            errorMessage = companyStore.getAddCompanyError()
        }
        this.setState({
            message : errorMessage,
            token : sessionStore.getAccessToken()
        });
    }
}


export default CompanyRegistration;
