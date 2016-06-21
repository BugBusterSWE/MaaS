import * as React from "react";
import {Link, browserHistory} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import databaseStore from "../../../stores/databaseStore";
import databaseActionCreator, {IDatabase}
    from "../../../actions/databaseActionCreator";

// TODO: Remove console.log
/**
 * <p>IShowCompaniesState defines an interface
 * which stores the data of the companies.</p>
 */
export interface IShowDatabasesState {
    databases : IDatabase[];
}

/**
 * <p>ShowDatabase is a react component that renders
 * the navbar and the table with data of the databases.</p>
 * 
 * @history
 * | Author           | Action Performed    | Data       |
 * |------------------|---------------------|------------|
 * | Davide Rigoni    | Create class        | 21/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class ShowDatabases extends React.Component<void, IShowDatabasesState> {

    /**
     * @description Default constructor.
     * @return {ShowDatabases}
     */
    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the ShowDatabases component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /*
         * @description Array that will contain the rows of databases table
         */
        let databasesTable : Array<Object> = [];

        this.state.databases.forEach(function (database : IDatabase) : void {
            databasesTable.push(<tr>
                <td>
                    <Link to={`/SuperAdmin/company/${database._id}`}>
                        {database.dbName}
                    </Link>
                </td>
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
                        <h3>Databases</h3>
                    </div>
                    <div className="divider"></div>
                    <table className="striped">
                        <thead>
                            <tr>
                                <th data-field="name">Database Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {databasesTable}
                        </tbody>
                    </table>
                    <div className="right">
                        <Link className="waves-effect waves-light btn" to="/SuperAdmin/AddCompany">
                            Add new database
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
        if (!(sessionStore.checkPermission(PermissionLevel.GUEST))) {
            browserHistory.push("/Error403")
        }
        databaseStore.addChangeListener(this._onChange);
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        databaseStore.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        // TODO
    }

}

export default ShowDatabases;
