import * as React from "react";
import {Link, browserHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../../components/navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import ErrorMessage from "../../components/errorMessageComponent";
import companyStore from "../../../stores/companyStore";
import companyActionCreator from "../../../actions/companyActionCreator";


/**
 *  This interface represents the state of {AddMemberToCompanyAsAdmin} page.
 */
export interface IAddMemberState {
    company : string;
    token : string;
    message : string;
}

/**
 * <p>This class represents the add member to company page.</p>
 *
 * @history
 * | Author           | Action Performed               | Data       |
 * |------------------|--------------------------------|------------|
 * | Davide Polonio    | Create interfaces and class    | 05/07/2016 |
 *
 * @author  Davide Polonio
 * @license MIT
 *
 */
class AddMemberToCompanyAsAdmin extends
    React.Component<void, IAddMemberState> {

    /**
     * @description Default constructor.
     * @return {AddMemberToCompanyAsAdmin}
     */
    constructor() {
        super();
        this.state = {
            company : sessionStore.getUserCompanyID(),
            token : sessionStore.getAccessToken(),
            message : companyStore.getAddMemberError()
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the AddMember component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Add member to company</h3>
                    </div>
                    <div className="divider"></div>

                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">email</i>
                                    <input id="email" type="email" className="validate" ref="email"/>
                                    <label for="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <select className="browser-default" ref="level">
                                        <option value={PermissionLevel.GUEST} selected="true">
                                            Guest
                                        </option>
                                        <option value={PermissionLevel.MEMBER}>Member</option>
                                        <option value={PermissionLevel.ADMIN}>Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this.addMember.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Add Member
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
        let email : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        let level : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["level"]).value;
        let company : string = this.state.company;
        companyActionCreator
            .addMember(company, this.state.token,  {
                email : email,
                password : undefined,
                level : level,
                company : company
            });
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        if (!(sessionStore.checkPermission(PermissionLevel.ADMIN))) {
            browserHistory.push("/Error403")
        }
        companyStore.addChangeListener(this._onChange);
        companyActionCreator.getCompaniesMembers(
            sessionStore.getUserCompanyID(),
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
        } else {
            browserHistory.push("/Members");
        }
        this.setState({
            company: sessionStore.getUserCompanyID(),
            token: sessionStore.getAccessToken(),
            message : errorMessage
        });
    }
}

export default AddMemberToCompanyAsAdmin;
