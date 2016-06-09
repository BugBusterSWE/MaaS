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

interface IAddCompanyState {
    message : string;
    token : string;
}

class AddCompany extends React.Component<void, IAddCompanyState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates an AddCompany, defines its state and
     * binds _onChange function to "this"</p>
     * @return {AddCompany}
     */
    constructor() {
        super();
        this.state = {
            message: companyStore.getAddCompanyError(),
            token: sessionStore.getAccessToken()
        };

        this._onChange = this._onChange.bind(this);
    }

    addCompany() : void {
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

    // TODO: passare parametro al messaggio di errore
    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.SUPERADMIN} />
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

        /*
     following methods are automatically called.
     */

    private componentDidMount() : void {
        companyStore.addChangeListener(this._onChange);
    }

    private componentWillUnmount() : void {
        companyStore.removeChangeListener(this._onChange);
    }

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


export default AddCompany;
