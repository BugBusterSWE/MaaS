import * as React from "react";
import {Link, browserHistory} from "react-router";
import Navbar from "../../components/navbar/navbar";
import ErrorMessage from "../../components/errorMessageComponent";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import databaseStore from "../../../stores/databaseStore";
import databaseActionCreator, {IDatabase}
    from "../../../actions/databaseActionCreator";

// TODO: Remove console.log
/**
 * <p>IShowDatabasesState defines an interface
 * which stores the data of the databases.</p>
 */
export interface IShowDatabasesState {
    message : string;
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
        this.state = {
            message: "",
            databases: databaseStore.getAllDatabasesResponse()
        };
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

        /* tslint:disable: max-line-length */
        this.state.databases.forEach(function (database : IDatabase) : void {
            databasesTable.push(<tr>
                <td>
                    <Link to={`/Databases/Database/${database._id}`}>
                        {database.dbName}
                    </Link>
                </td>
                <td>
                    <Link className="waves-effect waves-light btn"
                          to={`/Databases/${database._id}`}>
                        <i className="small material-icons">info_outline</i>
                    </Link>
                </td>
            </tr>);
        });
        /* tslint:enable: max-line-length */

        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Databases</h3>
                    </div>
                    <div className="divider"></div>
                    <div>
                        <ErrorMessage error={this.state.message} />
                    </div>
                    <table className="striped">
                        <thead>
                            <tr>
                                <th data-field="name">Database Name</th>
                                <th data-field="details">Details</th>
                                <th data-field="details">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {databasesTable}
                        </tbody>
                    </table>
                    <div className="right">
                        <Link className="waves-effect waves-light btn" to="/Databases/Add">
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

        databaseActionCreator.getAllDatabase({
            id_company: sessionStore.getUserCompanyID()
        });
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
        let errorMessage : string = "";
        if (databaseStore.isFindDatabaseErrored()) {
            errorMessage = databaseStore.getFindDatabaseError().message
        }
        this.setState({
            message: errorMessage,
            databases: databaseStore.getAllDatabasesResponse()
        });
    }

    /**
     * @description This method is called every time is deleted a database.
     */
    private _onDelete() : void {
        // TODO: databaseActionCreator.removeDatabase();
    }

}

export default ShowDatabases;
