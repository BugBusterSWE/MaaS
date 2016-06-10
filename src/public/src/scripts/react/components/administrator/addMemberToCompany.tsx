import * as React from "react";
import * as ReactDOM from "react-dom";
import Navbar from "../../navbar/navbar";
import {PermissionLevel} from "../../../stores/sessionStore"
import ErrorMessage from "../errorMessageComponent";
import companyStore from "../../../stores/companyStore";
import sessionStore from "../../../stores/sessionStore"
import companyActionCreator from "../../../actions/companyActionCreator";
import {ICompany} from "../../../actions/companyActionCreator";


export interface IAddMemberState {
    company : ICompany;
    token : string;
    message : string;
}

/**
 * IAddMemberProps defines an interface
 * which stores the params (the company_id passed through the URI)
 */
export interface IAddMemberProps {
    params : ReactRouter.Params
}


/**
 * <p>This class represents the nadd member to company page.</p>
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
class AddMemberToCompany extends
    React.Component<IAddMemberProps, IAddMemberState> {

    /**
     * @description ID of the company.
     */
    private company_id : string = this.props.params["company_id"];


    /**
     * @description Default constructor.
     * @return {AddMemberToCompany}
     */
    constructor() {
        super();
        this.state = {
            company : companyStore.getCompany(this.company_id),
            token : sessionStore.getAccessToken(),
            message : companyStore.getAddMemberError()
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the addMember component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.SUPERADMIN} />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Add member to company</h3>
                        <h4 className="grey-text">{this.state.company.name}</h4>
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
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="password" type="password" className="validate" ref="password"/>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <select className="browser-default" ref="level">
                                        <option value="MEMBER" selected="true">
                                            Member
                                        </option><option value="ADMIN">Admin</option>
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
        let password : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;
        let level : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["level"]).value;
        let company : string = this.state.company._id;
        companyActionCreator
            .addMember(company, this.state.token,  {
                email : email,
                password : password,
                level : level,
                company : company
            });
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
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

export default AddMemberToCompany;
