import * as React from "react";
import {Link, browserHistory} from "react-router";
import Navbar from "../../components/navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore"
import companyStore from "../../../stores/companyStore";
import companyActionCreator from "../../../actions/companyActionCreator";
import {IMember} from "../../../actions/companyActionCreator";

/**
 * <p>IShowCompanyMemberState defines an interface
 * which stores the data of the company and members.</p>
 */
export interface IShowMembersState {
    company_id : string;
    members : IMember[];
    token : string;
}

/**
 * <p>IShowCompanyMembersProps defines an interface
 * which stores the params (the company_id passed through the URI)</p>
 */

/**
 * <p>ShowMemberList is a react component that renders
 * the navbar and the table with data of the members.</p>
 *
 * @history
 * | Author           | Action Performed               | Data       |
 * |------------------|--------------------------------|------------|
 * | Davide Polonio | Create interfaces and class    | 05/07/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 *
 */
class ShowMemberList extends
    React.Component<void, IShowMembersState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a ShowCompanyMembers and defines its state.</p>
     * @return {ShowMemberList}
     */
    constructor() {
        super();

        this.state = {
            company_id : sessionStore.getUserCompanyID(),
            members: companyStore.
            getCompanyMembers(sessionStore.getUserCompanyID()),
            token: sessionStore.getAccessToken()
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the navbar and the table of members.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /*
         * @description Array that will contain the rows of member table
         */
        let membersTable : Array<Object> = [];

        this.state.members.forEach(function (member : IMember) : void {

            if (member.level == "OWNER") {

                // A owner cannot be deleted of edited

                membersTable.push(<tr>
                    <td>{member.email}</td>
                    <td>{member.level}</td>
                </tr>);

            } else {
                membersTable.push(<tr>
                    <td>{member.email}</td>
                    <td>{member.level}</td>
                    <td><Link className="waves-effect waves-light btn"
                              to={`/Admin/Edit/${member._id}`}>
                        <i className="small material-icons">mode_edit
                        </i>
                    </Link></td>
                </tr>);
            }

        });

        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
            <div id="contentBody" className="container">
        <div id="titles">
        <h3>Company</h3>
        </div>
        <h5>Members</h5>
        <div className="divider"></div>
        <table className="striped">
        <thead>
            <tr>
                <th data-field="email">Email</th>
                <th data-field="level">Level</th>
                <th data-field="option">Option</th>
        </tr>
        </thead>
        <tbody>
        {membersTable}
        </tbody>
        </table>
        <div className="right">
        <Link className="waves-effect waves-light btn" to={`/Admin/AddMember`}>
        Add Member
        </Link>
        </div>
        </div>
        </div>
    );
        /* tslint:enable: max-line-length */
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
        this.setState({
            company_id: sessionStore.getUserCompanyID(),
            members: companyStore.
            getCompanyMembers(sessionStore.getUserCompanyID()),
            token: sessionStore.getAccessToken()
        });
    }
}

export default ShowMemberList;
