import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbar";
import {PermissionLevel} from "../../../stores/sessionStore"
import CompanyStore from "../../../stores/companyStore";
import companyActionCreator from "../../../actions/companyActionCreator";
import {ICompany, IMember} from "../../../actions/companyActionCreator";

export interface IShowCompanyMembersState {
    company : ICompany;
    members : IMember[];
}

export interface IParam {
    company_id : string;
}

export interface IShowCompanyMembersProps {
    params : IParam
}

class ShowCompanyMembers extends
    React.Component<IShowCompanyMembersProps, IShowCompanyMembersState> {

    constructor(props : IShowCompanyMembersProps) {
        super(props);

        this.state = {
            company: CompanyStore.
                getCompany(this.props.params.company_id),
            members: CompanyStore.
                getCompanyMembers(this.props.params.company_id)
        };
    }

    /*
     i seguenti metodi vengono richiamati in automatico
     */

    componentDidMount() : void {
        CompanyStore.addChangeListener(this._onChange);
        companyActionCreator.getCompaniesData();
        companyActionCreator.getCompaniesMembers();
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

    render() : JSX.Element {

        let membersTable : Array<Object> = [];

        /*
         Scorre le comapnies presenti nel suo stato
         e carica le companies nella variabile companiesTable
         */
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
}

export default ShowCompanyMembers;
