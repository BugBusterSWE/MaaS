import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbar";
import {PermissionLevel} from "../../../stores/sessionStore"
import companyStore from "../../../stores/companyStore";
import sessionStore from "../../../stores/sessionStore"
import companyActionCreator, {ICompany}
    from "../../../actions/companyActionCreator";

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
export interface IShowCompaniesState {
    companies : Array<ICompany>;
}

/**
 * 
 * ShowCompanies is a react component that renders 
 * the navbar and the table with data of the companies.
 *
 */
class ShowCompanies extends React.Component<void, IShowCompaniesState> {

    private token : string = sessionStore.getAccessToken();

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
            companies: companyStore.getCompaniesData()
        };

        this._onChange = this._onChange.bind(this);
    }

    /*
     following methods are automatically called.
     */

    componentDidMount() : void {
        companyStore.addChangeListener(this._onChange);
        // T this.token = SessionStore.getAccessToken();
        companyActionCreator.getCompaniesData(this.token);
    }

    componentWillUnmount() : void {
        companyStore.removeChangeListener(this._onChange);
    }

    _onChange() : void {
        console.log("onChange showCompanies");
        this.setState({
            companies: companyStore.getCompaniesData()
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
                companiesTable.push(<tr>
                    <td><Link to={"/SuperAdmin/company/" + company._id}>
                        {company.name}
                    </Link></td>
                    <td>{company._id}</td>
                </tr>);

        });
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.SUPERADMIN} />
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
                        <Link className="waves-effect waves-light btn" to="/SuperAdmin/AddCompany">
                            Add new company
                        </Link>
                    </div>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */
    }

}


export default ShowCompanies;
