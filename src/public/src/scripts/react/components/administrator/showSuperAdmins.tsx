import * as React from "react";
import {Link, browserHistory} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import store from "../../../stores/companyStore";
import userActionCreators, {ISuperAdmin} from "../../../actions/userActionCreator";
import userStore from "../../../stores/userStore";


/**
 * <p>IShowCompaniesState defines an interface
 * which stores the data of the companies.</p>
 */
export interface IShowAdminsState {

    superAdmins : ISuperAdmin[],
    token : string
}
/**
 * <p>ShowAdmin is a react component that renders
 * the navbar and the table with a list of the Super Admins.</p>
 *
 * @history
 * | Author           | Action Performed    | Data       |
 * |------------------|---------------------|------------|
 * | Davide Polonio | Create class | 29/05/2016 |
 *
 * @author Davide Polonio
 * @license MIT
 */

class ShowAdmins extends React.Component<void, IShowAdminsState> {

    /**
     * @description Default constructor.
     * @return {ShowAdmins}
     */
    constructor() {
        super();
        this.state = {
            superAdmins : userStore.getAllSuperAdmin(),
            token : sessionStore.getAccessToken()
         };

        this._onChange = this._onChange.bind(this);

    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the ShowAdmins component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /*
         * @description Array that will contain the rows of company table
         */
        let showAdminTable:Array<Object> = [];

        this.state.superAdmins.forEach(
            function (superAdmin:ISuperAdmin):void {
                console.log("Aggiungo il seguente elemento alla lista");
                console.log("superAdmin email: " + superAdmin.email);
                showAdminTable.push(
                    <tr>
                        <td>{superAdmin.email}</td>
                    </tr>
                );
            });

        if (showAdminTable == undefined) {

            console.log("showAdminTable is undefined");
        } else {
            console.log("showAdminTable is defined and is size is" +
                showAdminTable.length);
        }

        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Super Admins List</h3>
                    </div>
                    <div className="divider"></div>
                    <table className="striped">
                        <thead>
                        <tr>
                            <th data-field="name">E-mail</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showAdminTable}
                        </tbody>
                    </table>
                    <div className="right">
                        <Link className="waves-effect waves-light btn" to="/SuperAdmin/Management">
                            Add new super admin
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
            browserHistory.push("/Error403")
        }

        store.addChangeListener(this._onChange);
        userActionCreators.getSuperAdmins(this.state.token);
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
            superAdmins : userStore.getAllSuperAdmin(),
            token: sessionStore.getAccessToken()
        });
    }
}

export default ShowAdmins;