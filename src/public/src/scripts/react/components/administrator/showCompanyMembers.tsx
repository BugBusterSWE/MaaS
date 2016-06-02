import * as React from "react";
import Navbar from "../../navbar/navbarSuperAdmin";
import {Link} from "react-router";
import CompanyStore from "../../../stores/companyStore";
import companyActionCreator from "../../../actions/companyActionCreator";
import {ICompany, IMember} from "../../../actions/companyActionCreator";


/**
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

/**
 * 
 * IShowCompanyMemberState defines an interface
 * which stores the data of the company and members.
 * 
 */
interface IShowCompanyMembersState {
    company : ICompany;
    members : IMember[];
}


interface IParam {
    company_id : string;
}

/**
 * 
 * IShowCompanyMembersProps defines an interface
 * which stores the params (the company_id passed through the URI)
 * 
 */
interface IShowCompanyMembersProps {
    params : IParam
}

/**
 *
 * ShowCompanyMembers is a react component that renders
 * the navbar and the table with data of the members.
 *
 */
export default class ShowCompanyMembers
extends React.Component<IShowCompanyMembersProps, IShowCompanyMembersState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a ShowCompanyMembers 
     * and defines its state.</p>
     * @return {ShowCompanyMembers}
     */
    constructor(props : IShowCompanyMembersProps) {
        super(props);
        console.log("ShowCompaniesMembers Constructor");
        console.log(this.props);
        console.log(this.props.params);
        this.state = {
            company: CompanyStore.
                getCompany(this.props.params.company_id),
            members: CompanyStore.
                getCompanyMembers(this.props.params.company_id)
        };
    }

    /*
     following methods are automatically called.
     */

    componentDidMount() : void {
        CompanyStore.addChangeListener(this._onChange);
        companyActionCreator.getCompaniesData();
        companyActionCreator.getCompaniesMembers(this.state.company._id);
    }

    componentWillUnmount() : void {
        CompanyStore.removeChangeListener(this._onChange);
    }

    _onChange() : void {
        this.setState({
            company: CompanyStore.
                getCompany(this.props.params.company_id),
            members: CompanyStore.
                getCompanyMembers(this.props.params.company_id)
        });
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the navbar and the table of members.</p>
     * @return {JSX.Element}
     */
    render() : JSX.Element {

        /**
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
                <Navbar />
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
}
