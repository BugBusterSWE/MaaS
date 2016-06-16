import * as React from "react";
import {Link, hashHistory} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import store from "../../../stores/companyStore";
import companyActionCreator, {ICompany}
    from "../../../actions/companyActionCreator";

/**
 * <p>IShowCompaniesState defines an interface
 * which stores the data of the companies.</p>
 */
export interface IShowCompaniesState {
    companies : ICompany[];
    token : string;
}

/**
 * <p>ShowCompanies is a react component that renders
 * the navbar and the table with data of the companies.</p>
 * 
 * @history
 * | Author           | Action Performed    | Data       |
 * |------------------|---------------------|------------|
 * | Emanuele Carraro | Create interface    | 21/05/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 */
class ShowCompanies extends React.Component<void, IShowCompaniesState> {

    /**
     * @description Default constructor.
     * @return {ShowCompanies}
     */
    constructor() {
        super();
        this.state = {
            companies: store.getCompaniesData(),
            token: sessionStore.getAccessToken()
        };

        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the ShowCompanies component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /*
         * @description Array that will contain the rows of company table
         */
        let companiesTable : Array<Object> = [];

        this.state.companies.forEach(function (company : ICompany) : void {
            companiesTable.push(
                <tr>
                    <td>
                        <Link to={`/SuperAdmin/company/${company._id}`}>
                            {company.name}
                        </Link>
                    </td>
                    <td>{company.owner}</td>
                    <td>
                        <Link className="waves-effect waves-light btn"
                              to={`/SuperAdmin/updateCompany/${company._id}`}>
                            <i className="small material-icons">mode_edit
                            </i>
                        </Link>
                    </td>
                </tr>);
        });


        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
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
                        <Link className="waves-effect waves-light btn" to="/SuperAdmin/AddCompany">
                            Add new company
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
        store.addChangeListener(this._onChange);
        // T this.token = sessionStore.getAccessToken();
        companyActionCreator.getCompaniesData(this.state.token);
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        store.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        this.setState({
            companies: store.getCompaniesData(),
            token: sessionStore.getAccessToken()
        });
    }

}

export default ShowCompanies;
