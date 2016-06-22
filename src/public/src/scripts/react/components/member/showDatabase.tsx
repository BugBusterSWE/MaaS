import * as React from "react";
import {Link, browserHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import databaseStore from "../../../stores/databaseStore";
import databaseActionCreator, {IDatabase}
    from "../../../actions/databaseActionCreator";
import ErrorMessage from "../errorMessageComponent";

// TODO: Remove console.log and finish form
/**
 * <p>IShowDatabaseState defines an interface
 * which stores the data of the databases.</p>
 */
export interface IShowDatabaseState {
    message : string;
    database : IDatabase;
}

/**
 * <p>ShowDatabase is a react component that renders the show database page.</p>
 * 
 * @history
 * | Author           | Action Performed    | Data       |
 * |------------------|---------------------|------------|
 * | Davide Rigoni    | Create class        | 21/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class ShowDatabase extends React.Component<void, IShowDatabaseState> {

    /**
     * @description Default constructor.
     * @return {ShowDatabase}
     */
    constructor() {
        super();
        this.state = {
            message: "",
            database: undefined
        }
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the ShowDatabase component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Database</h3>
                        <h4>{this.state.database.dbName}</h4>
                    </div>
                    <div className="divider"></div>
                    In this pages is possible change the database or delete it.
                    <br/><br/>
                    <div className="row">
                        <div className="row">
                            <div className="col s12">
                                <div><strong>Name: </strong>{this.state.database.dbName}</div>
                                <div><strong>Host: </strong>{this.state.database.host}</div>
                                <div><strong>Port: </strong>{this.state.database.port}</div>
                                <div><strong>Username: </strong>{this.state.database.username}</div>
                            </div>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div>
                        <h4>Edit database</h4>
                        <div className="divider"></div>
                        <div className="row">
                            If you want change your database data click on "Change Database" button.<br/>
                            <div className="right ">
                                <a className="waves-effect waves-light btn" onClick={this._changeDatabase.bind(this)}>
                                    Change Database
                                </a>
                            </div>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div className="row">
                        <h4>Danger zone</h4>
                        <div className="divider"></div>
                        <div className="row">
                            <ErrorMessage error={this.state.message} />
                        </div>
                        <div className="row">
                            If you want remove this database from MaaS, insert the name of the database and click on "Remove Database"
                            <div className="input-field col s12">
                                <input id="database" type="text" ref="database"/>
                                <label for="database">Database</label>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn red" onClick={this._removeDatabase.bind(this)}>
                                    Remove Database
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        /* tslint:enable: max-line-length */

    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        if (!(sessionStore.checkPermission(PermissionLevel.ADMIN))) {
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
        let errorMessage : string = "";
        if (databaseStore.isFindDatabaseErrored()) {
            errorMessage = databaseStore.getFindDatabaseError().message
        }
        this.setState({
            message: errorMessage,
            database: undefined
        });
    }

    /**
     * @description This method is called every time a database is removed.
     */
    private _removeDatabase() : void {
        // TODO: databaseActionCreator.removeDatabase()
    }

    /**
     * @description This method is called every time a database is removed.
     */
    private _changeDatabase() : void {
        // TODO: Link to
    }

}

export default ShowDatabase;
