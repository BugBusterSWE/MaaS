import * as React from "react";
import {Link, browserHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../../components/navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import ErrorMessage from "../../components/errorMessageComponent";
import companyStore from "../../../stores/companyStore";
import companyActionCreator from "../../../actions/companyActionCreator";
import {IMember} from "../../../actions/companyActionCreator";
import userActionCreators,
        {IRemoveProfile} from "../../../actions/userActionCreator";

/**
 *  This interface represents the state of {EditMemberOfACompany} page.
 */
export interface IEditMemberState {
    member : IMember;
    company : string;
    token : string;
    message : string;
}

/**
 * <p>IEditMemberProps defines an interface
 * which stores the params (the user_id passed through the URI).</p>
 */
export interface IEditMemberProps {
    params : ReactRouter.Params
}


/**
 * <p>This class represents the edit member of a company page.</p>
 *
 * @history
 * | Author           | Action Performed               | Data       |
 * |------------------|--------------------------------|------------|
 * | Davide Polonio | Create interfaces and class    | 05/07/2016 |
 *
 * @author  Davide Polonio
 * @license MIT
 *
 */
class EditMemberOfACompany extends
    React.Component<IEditMemberProps, IEditMemberState> {

    /**
     * @description ID of the member.
     */
    private member_id : string = this.props.params["member_id"];


    /**
     * @description Default constructor.
     * @return {EditMemberOfACompany}
     */
    constructor(props : IEditMemberProps) {
        super(props);
        this.state = {
            member : companyStore.getMemberOfACompany( this.member_id ),
            company : sessionStore.getUserCompanyID(),
            token : sessionStore.getAccessToken(),
            message : companyStore.getAddMemberError()
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the EditMember component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Edit Member</h3>
                        <h4 className="grey-text">{this.state.member.email}</h4>
                    </div>
                    <div className="divider"></div>

                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s6">
                                    <p>Change the user level. Now this user is a {this.state.member.level}.</p>
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
                                <a className="waves-effect waves-light btn" onClick={this.save.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Save
                                </a>
                            </div>
                            <div className="delete">
                                <a className="waves-effect waves-light btn red" onClick={this.delete.bind(this)}>
                                    <i className="material-icons left">delete</i>
                                    Delete
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
     * <p>This method is call when the user click on the Save Member button.</p>
     */
    private save() : void {

        let level : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["level"]).value;

        userActionCreators
            .updateUserLevel({
                _id : this.state.member._id,
                level : level,
                company_id : sessionStore.getUserCompanyID(),
                token : sessionStore.getAccessToken()
            });

    }

    /**
     * @description
     * <p>This method is call when the user click on the Delete Member
     * button.</p>
     */
    private delete() : void {

        let removeData : IRemoveProfile = {

            token : this.state.token,
            company_id : this.state.company,
            user_id : this.state.member._id
        };

        userActionCreators.removeProfile(removeData);
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
        if (companyStore.addMemberError()) { // TODO
            errorMessage = companyStore.getAddMemberError()
        }
        this.setState({
            member : companyStore.getMemberOfACompany( this.member_id ),
            company : sessionStore.getUserCompanyID(),
            token : sessionStore.getAccessToken(),
            message : companyStore.getAddMemberError()
        });
    }
}

export default EditMemberOfACompany;
