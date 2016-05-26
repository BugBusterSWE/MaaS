import * as React from "react";
import Navbar from "../../navbar/navbarSuperAdmin.tsx";
import {Link} from "react-router";
import CompanyStore from "../../../stores/companyStore.ts";
import companyActionCreator from "../../../actions/companyActionCreator.ts";
import {ICompany, IMember} from "../../../actions/companyActionCreator.ts";

interface IShowCompanyMembersState {
    company : ICompany;
    members : IMember[];
}

interface Param {
    company_id : string;
}

interface IShowCompanyMembersProps {
    params : Param
}

export default class ShowCompanyMembers extends React.Component<IShowCompanyMembersProps, IShowCompanyMembersState> {

    constructor(props) {
        super(props);
        
        this.state = {
            company: CompanyStore.getCompany(this.props.params.company_id),
            members: CompanyStore.getCompanyMembers(this.props.params.company_id)
        };

        /*
         In EcmaScript6 i metodi non definiti da React
         non sono legati al giusto "this"
         */
        this._onChange = this._onChange.bind(this);
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
            company: CompanyStore.getCompany(this.props.params.company_id),
            members: CompanyStore.getCompanyMembers(this.props.params.company_id)
        });
    }

    render() {

        let membersTable : Array<Object> = [];

        /*
         Scorre le comapnies presenti nel suo stato
         e carica le companies nella variabile companiesTable
         */
        this.state.members.forEach(function (member) {

                membersTable.push(<tr>
                    <td>{member.username}</td>
                    <td>{member.level}</td>
                </tr>);

        });

        return(
            <div>
                <Navbar></Navbar>
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
                                <th data-field="id">Id</th>
                                <th data-field="email">Email</th>
                                <th data-field="level">Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {membersTable}
                        </tbody>
                    </table>
                    <div className="right">
                        <Link className="waves-effect waves-light btn" to={`/SuperAdmin/company/${this.state.company.id}/addMember`}>
                            Add Member
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
