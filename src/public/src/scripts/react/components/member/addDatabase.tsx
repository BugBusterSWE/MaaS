import * as React from "react";
import {Link, browserHistory} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import databaseStore from "../../../stores/databaseStore";
import databaseActionCreator, {IDatabase}
    from "../../../actions/databaseActionCreator";
import ErrorMessage from "../errorMessageComponent";

// TODO: Remove console.log
/**
 * <p>IAddDatabaseState defines an interface
 * which stores the data of the databases.</p>
 */
export interface IAddDatabaseState {
    message : string;
}

/**
 * <p>AddDatabase is a react component that renders the add database page.</p>
 * 
 * @history
 * | Author           | Action Performed    | Data       |
 * |------------------|---------------------|------------|
 * | Davide Rigoni    | Create class        | 21/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class AddDatabase extends React.Component<void, IAddDatabaseState> {

    /**
     * @description Default constructor.
     * @return {AddDatabase}
     */
    constructor() {
        super();
        this.state = {
            message: ""
        }
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the AddDatabase component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Add Database</h3>
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
                                    <input id="port" type="text" className="validate" ref="port"/>
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
                                    <input id="password" type="password" className="validate" ref="password"/>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this.addDatabase.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Add Database
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
        if (databaseStore.isAddDatabaseErrored()) {
            errorMessage = databaseStore.getAddDatabaseError().message
        } else {
            browserHistory.push("/Databases");
        }
        this.setState({
            message: errorMessage
        });
    }

    /**
     * @description This method is called every time is added a database.
     */
    private addDatabase() : void {
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
        databaseActionCreator.addDatabase({
            dbName : nameValue,
            password : passwordValue,
            username : usernameValue,
            host : hostValue,
            port : +portValue,
            id_company : undefined
        });
    }
}

export default AddDatabase;
