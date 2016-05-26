import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbarSuperAdmin.tsx";
import store from "../../../stores/companyStore.ts";
import {ICompany} from "../../../actions/companyActionCreator.ts";

import CompanyStore from "../../../stores/companyStore.ts";
// I import SessionStore from "../../../stores/sessionStore.ts";

interface IShowCompaniesState {
    companies : Array<ICompany>;
}

class ShowCompanies extends React.Component<void, IShowCompaniesState> {
    token : string = "";
    constructor() {
        super();
        this.state = {
            companies: store.getCompaniesData()
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
        store.addChangeListener(this._onChange);
        // T this.token = SessionStore.getAccessToken();
        // T companyActionCreator.getCompaniesData();
    }

    componentWillUnmount() : void {
        store.removeChangeListener(this._onChange);
    }

    _onChange() : void {
        this.setState({
            companies: store.getCompaniesData()
        });
    }


    render() : JSX.Element {

        let companiesTable : Array<Object> = [];

        /*
         Scorre le comapnies presenti nel suo stato
         e carica le companies nella variabile companiesTable
         */
        this.state.companies.forEach(function (company : ICompany) : void {

                companiesTable.push(<tr>
                    <td><Link to={`/SuperAdmin/company/${company.id}`}>
                        {company.name}
                    </Link></td>
                    <td>{company.id}</td>
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
                                <th data-field="name">Company</th>
                                <th data-field="owner">Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companiesTable}
                        </tbody>
                    </table>
                     <div className="right">
                        <Link className="waves-effect waves-light btn"
                              to="/SuperAdmin/AddCompany">
                            Add new company
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowCompanies;