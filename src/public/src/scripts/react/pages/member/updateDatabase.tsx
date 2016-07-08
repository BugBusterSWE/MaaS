import * as React from "react";
import {Link, browserHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../../components/navbar/navbar";
import ErrorMessage from "../../components/errorMessageComponent";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import databaseStore from "../../../stores/databaseStore";
import databaseActionCreator, {IDatabase}
    from "../../../actions/databaseActionCreator";

/**
 * <p>IUpdateDatabaseState defines an interface
 * which stores the data of the databases.</p>
 */
export interface IUpdateDatabaseState {
    message : string;
    database : IDatabase;
}

/**
 * <p>IUpdateDatabaseProps defines an interface
 * which stores the params (the id_database passed through the URI).</p>
 */
export interface IUpdateDatabaseProps {
    params : ReactRouter.Params
}

/**
 * <p>UpdateDatabase is a react component that renders
 * the update database page.</p>
 * 
 * @history
 * | Author           | Action Performed    | Data       |
 * |------------------|---------------------|------------|
 * | Davide Rigoni    | Create class        | 21/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class UpdateDatabase extends
    React.Component<IUpdateDatabaseProps, IUpdateDatabaseState> {


    /**
     * @description ID of the database.
     */
    private database_id : string = this.props.params["database_id"];

    /**
     * @description Default constructor.
     * @return {UpdateDatabase}
     */
    constructor(props : IUpdateDatabaseProps) {
        super(props);
        this.state = {
            message: "",
            database: {
                _id : "",
                dbName : "",
                password : "",
                username : "",
                host : "",
                port : 0
            }
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the UpdateDatabase component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Update Database</h3>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="name" type="text" className="validate" ref="name"/>
                                    <label for="name">Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="host" type="text" className="validate" ref="host"/>
                                    <label for="host">Host</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="port" type="number" className="validate" ref="port"/>
                                    <label for="port">Port</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="username" type="text" className="validate" ref="username"/>
                                    <label for="username">Username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" type="password" className="validate" ref="password" />
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this.updateDatabase.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Update Database
                                </a>
                            </div>
                        </form>
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
        if (!(sessionStore.checkPermission(PermissionLevel.ADMIN))) {
            browserHistory.push("/Error403")
        }
        databaseStore.addChangeListener(this._onChange);
        databaseActionCreator.findDatabase({
            id_company: sessionStore.getUserCompanyID(),
            id_database: this.database_id
        }, sessionStore.getAccessToken());
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
        if (databaseStore.isUpdateDatabaseErrored()) {
            errorMessage = errorMessage + " " +
                databaseStore.getUpdateDatabaseError().message
        }
        if (errorMessage == "" && this.state.database.port != 0) {
            browserHistory.push("/Databases/Database/"
                + this.state.database._id);
        }
        this.setState({
            message: errorMessage,
            database: databaseStore.getFindDatabaseResponse()
        });
    }

    /**
     * @description This method is called every time is added a database.
     */
    private updateDatabase() : void {
        let nameValue : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["name"]).value;
        let hostValue : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["host"]).value;
        let portValue : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["port"]).value;
        let usernameValue : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["username"]).value;
        let passwordValue : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;
        databaseActionCreator.updateDatabase({
            dbName : nameValue,
            password : passwordValue,
            username : usernameValue,
            host : hostValue,
            port : +portValue,
            id_company : sessionStore.getUserCompanyID(),
            id_database : this.database_id,
        }, sessionStore.getAccessToken());
    }
}

export default UpdateDatabase;
