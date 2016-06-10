import * as React from "react";
import {Link, hashHistory} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore"
import companyStore from "../../../stores/companyStore";
import companyActionCreator from "../../../actions/companyActionCreator";
import {ICompany, IMember} from "../../../actions/companyActionCreator";

// TODO: Remove console.log
/**
 * <p>IShowCompanyMemberState defines an interface
 * which stores the data of the company and members.</p>
 */
export interface IShowCompanyMembersState {
    company : ICompany;
    members : IMember[];
    token : string;
}

/**
 * <p>IShowCompanyMembersProps defines an interface
 * which stores the params (the company_id passed through the URI)</p>
 */
export interface IShowCompanyMembersProps {
    params : ReactRouter.Params
}

/**
 * <p>ShowCompanyMembers is a react component that renders
 * the navbar and the table with data of the members.</p>
 *
 * @history
 * | Author           | Action Performed               | Data       |
 * |------------------|--------------------------------|------------|
 * | Emanuele Carraro | Create interfaces and class    | 22/05/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 *
 */
class ShowCompanyMembers extends
    React.Component<IShowCompanyMembersProps, IShowCompanyMembersState> {

    /**
     * @description ID of the company.
     */
    private company_id : string = this.props.params["company_id"];

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a ShowCompanyMembers and defines its state.</p>
     * @return {ShowCompanyMembers}
     */
    constructor(props : IShowCompanyMembersProps) {
        super(props);
        console.log("ShowCompaniesMembers Constructor");
        this.state = {
            company: companyStore.
                getCompany(this.company_id),
            members: companyStore.
                getCompanyMembers(this.company_id),
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

            membersTable.push(<tr>
                <td>{member.email}</td>
                <td>{member.level}</td>
            </tr>);

        });

        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.SUPERADMIN} />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Company</h3>
                        <h4 className="grey-text">{this.state.company.name}</h4>
                    </div>
                    <h5>Members</h5>
                    <div className="divider"></div>
                    <table className="striped">
                        <thead>
                            <tr>
                                <th data-field="email">Email</th>
                                <th data-field="level">Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {membersTable}
                        </tbody>
                    </table>
                    <div className="right">
                        <Link className="waves-effect waves-light btn" to={`/SuperAdmin/company/${this.state.company._id}/addMember`}>
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
        this.setState({
            company: companyStore.
                getCompany(this.company_id),
            members: companyStore.
                getCompanyMembers(this.company_id),
            token: sessionStore.getAccessToken()
        });
    }
}

export default ShowCompanyMembers;
