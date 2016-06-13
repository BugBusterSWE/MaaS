import * as React from "react";
import {Link} from "react-router";
import Navbar from "../navbar/navbar";
import {PermissionLevel} from "../../stores/sessionStore"
import companyActionCreator, {IAddCompanyUser, IAddCompanyName}
    from "../../actions/companyActionCreator";
import * as ReactDOM from "react-dom";
import ErrorMessage from "./errorMessageComponent";
import companyStore from "../../stores/companyStore";
import sessionStore from "../../stores/sessionStore"

/**
 *  This interface represents the state of {UserRegistration} page.
 */
export interface IUserRegistrationState {
    message : string;
}

/**
 * <p>IUserRegistrationProps defines an interface
 * which stores the params (the user tok pasen passed through the URI).</p>
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
        this.state = {
            message : companyStore.getAddMemberError()
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
                        <h3>AUser registration</h3>
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

    // TODO: da finire

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
        if (!(sessionStore.checkPermission(PermissionLevel.SUPERADMIN))) {
            hashHistory.push("/Error403")
        }
        companyStore.addChangeListener(this._onChange);
        companyActionCreator.getCompaniesMembers(this.state.company._id,
            this.state.token);
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
        if (companyStore.addMemberError()) {
            errorMessage = companyStore.getAddMemberError()
        }
        this.setState({
            company: companyStore.
            getCompany(this.company_id),
            token: sessionStore.getAccessToken(),
            message : errorMessage
        });
    }
}


export default UserRegistration;
