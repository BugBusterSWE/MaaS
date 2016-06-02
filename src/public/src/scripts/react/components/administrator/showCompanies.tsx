import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbarSuperAdmin";
import store from "../../../stores/companyStore";
import companyActionCreator,
    {ICompany} from "../../../actions/companyActionCreator";

/**
 *
 * @history
 * | Author           | Action Performed               | Data       |
 * |------------------|--------------------------------|------------|
 * | Emanuele Carraro | Create interfaces and class    | 21/05/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 * 
 */

/**
 * 
 * IShowCompaniesState defines an interface 
 * which stores the data of the companies.
 * 
 */
interface IShowCompaniesState {
    companies : Array<ICompany>;
}

/**
 * 
 * ShowCompanies is a react component that renders 
 * the navbar and the table with data of the companies.
 *
 */
class ShowCompanies extends React.Component<void, IShowCompaniesState> {

    token : string = "";

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a ShowCompanies, defines its state and
     * binds _onChange function to "this"</p>
     * @return {ShowCompanies}
     */
    constructor() {
        super();
        this.state = {
            companies: store.getCompaniesData()
        };

        this._onChange = this._onChange.bind(this);
    }

    /*
     following methods are automatically called.
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

    /**
     * @description
     * <p>Render method of the component.
     * It renders the navbar and the table of companies.</p>
     * @return {JSX.Element}
     */
    render() : JSX.Element {

        /**
         * @description Array that will contain the rows of company table
         */
        let companiesTable : Array<Object> = [];

        this.state.companies.forEach(function (company : ICompany) : void {
                console.log("ForEach Company");
                console.log(company.owner);
                companiesTable.push(<tr>
                    <td><Link to={"/SuperAdmin/company/" + company._id}>
                        {company.name}
                    </Link></td>
                    <td>{company._id}</td>
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
                                <th data-field="owner">Id</th>
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
