import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbarSuperAdmin";
import store from "../../../stores/companyStore";
import companyActionCreator,
    {ICompany} from "../../../actions/companyActionCreator";

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
    }

    /*
     i seguenti metodi vengono richiamati in automatico
     */

    componentDidMount() : void {
        store.addChangeListener(this._onChange);
        // T this.token = SessionStore.getAccessToken();
        companyActionCreator.getCompaniesData();
    }

    componentWillUnmount() : void {
        store.removeChangeListener(this._onChange);
    }

    _onChange() : void {
        console.log("onChange showCompanies");
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
                    <td>{company.email}</td>
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
