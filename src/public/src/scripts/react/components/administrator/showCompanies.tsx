import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbarSuperAdmin.tsx";
import CompanyStore from "../../../stores/companyStore.ts";
import SessionStore from "../../../stores/sessionStore.ts";
import {companyActionCreator} from "../../../actionCreators/companyActionCreator.ts"

class ShowCompanies extends React.Component<any, any> {
    token : string = "";
    constructor(props) {
        super(props);
        this.state = {
            companies: CompanyStore.getCompaniesData()
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
        this.token = SessionStore.getAccessToken();
        companyActionCreator.getCompaniesData();
    }

    componentWillUnmount() : void {
        CompanyStore.removeChangeListener(this._onChange);
    }

    _onChange() : void {
        this.setState({
            companies: CompanyStore.getCompaniesData()
        });
    }


    render() {

        let companiesTable : Array<Object> = [];

        /*
         Scorre le comapnies presenti nel suo stato
         e carica le companies nella variabile companiesTable
         */
        this.state.companies.forEach(function (company) {

                companiesTable.push(<tr>
                    <td>{company._id}</td>
                    <td><Link to={`/SuperAdmin/company/${company._id}`}>
                        {company.name}
                    </Link></td>
                    <td>{company.owner}</td>
                </tr>);

        });

        return(
            <div>
                <Navbar></Navbar>
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Companies</h3>
                        <h4 className="grey-text"></h4>
                    </div>
                    <div className="divider"></div>
                    <table className="striped">
                        <thead>
                            <tr>
                                <th data-field="id">Id</th>
                                <th data-field="name">Company</th>
                                <th data-field="owner">Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companiesTable}
                        </tbody>
                    </table>
                     <div className="right">
                        <Link className="waves-effect waves-light btn" to="/SuperAdmin/AddCompany">Add new company</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowCompanies;
